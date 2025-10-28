<script setup lang="ts">
import { ref, watch } from "vue";
import TheHeader from "./components/TheHeader.vue";
import SearchInput from "./components/SearchInput.vue";
import DrugCard from "./components/DrugCard.vue";
import AppSpinner from "./components/AppSpinner.vue";

interface Drug {
    id: number;
    generic_name: string;
    dosage_forms: string[];
    ed_level: string | null;
}

const API_ENDPOINT = "https://thai-nlem-api.onrender.com/api/drugs/search";
const DEBOUNCE_DELAY = 500;
const MIN_SEARCH_LENGTH = 2;
const searchQuery = ref("");
const searchResults = ref<Drug[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);
const hasSearched = ref(false);

let debounceTimer: number;
let abortController: AbortController | null = null;

const performSearch = async () => {
    if (searchQuery.value.trim().length < MIN_SEARCH_LENGTH) {
        searchResults.value = [];
        hasSearched.value = false;
        return;
    }

    abortController?.abort();
    abortController = new AbortController();

    isLoading.value = true;
    hasSearched.value = true;
    error.value = null;

    try {
        const response = await fetch(
            `${API_ENDPOINT}?q=${encodeURIComponent(searchQuery.value)}`,
            { signal: abortController.signal },
        );

        if (!response.ok) {
            throw new Error(`เกิดข้อผิดพลาด: ${response.statusText}`);
        }

        const data = await response.json();
        searchResults.value = data;
    } catch (err: any) {
        if (err.name === "AbortError") {
            console.log("Fetch aborted");
            return;
        }
        error.value = err.message || "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้";
        searchResults.value = [];
    } finally {
        isLoading.value = false;
    }
};

watch(searchQuery, () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(performSearch, DEBOUNCE_DELAY);
});
</script>

<template>
    <main id="app">
        <TheHeader />

        <div class="content-wrapper">
            <SearchInput v-model="searchQuery" />

            <section class="results">
                <AppSpinner v-if="isLoading" />
                <div v-else-if="error" class="error-message">{{ error }}</div>

                <div
                    v-else-if="searchResults.length === 0 && hasSearched"
                    class="empty-state"
                >
                    <h3>ไม่พบข้อมูล</h3>
                    <p>ไม่มีข้อมูลยาที่ตรงกับ "{{ searchQuery }}"</p>
                </div>

                <ul v-else class="results-list">
                    <li v-for="drug in searchResults" :key="drug.id">
                        <DrugCard :drug="drug" />
                    </li>
                </ul>
            </section>
        </div>
    </main>
</template>

<style scoped>
.content-wrapper {
    width: 100%;
    max-width: 42rem;
    margin-inline: auto;
}

.results {
    width: 100%;
    margin-top: var(--spacing-8);
}

.results-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: var(--spacing-4);
}

.error-message,
.empty-state {
    text-align: center;
    padding: var(--spacing-6) var(--spacing-4);
    margin-top: var(--spacing-4);
    border-radius: var(--border-radius);
    color: var(--color-text-secondary);
}

.error-message {
    color: var(--color-error);
    background-color: rgba(248, 113, 113, 0.05);
    border: 1px solid rgba(248, 113, 113, 0.3);
}

.empty-state {
    background-color: var(--color-card-bg);
}
</style>
