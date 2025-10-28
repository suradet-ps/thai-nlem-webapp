<!-- src/App.vue -->
<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

// --- Component Imports ---
import TheHeader from "./components/TheHeader.vue";
import SearchInput from "./components/SearchInput.vue";
import DrugCard from "./components/DrugCard.vue";
import AppSpinner from "./components/AppSpinner.vue";

// --- Store ---
import { useDrugStore } from "./stores/drugStore";

const drugStore = useDrugStore();
const { searchDrugs } = drugStore; // Actions can be destructured directly
// Use storeToRefs to keep state properties reactive
const { searchResults, isLoading, error, noResultsFound } =
    storeToRefs(drugStore);

// --- Local State ---
const searchQuery = ref("");
const DEBOUNCE_DELAY = 500;
let debounceTimer: number;

// --- Watcher ---
// The component now only handles the user input (debouncing)
// and calls the store action to perform the actual search.
watch(searchQuery, (newQuery) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        searchDrugs(newQuery);
    }, DEBOUNCE_DELAY);
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
                <div v-else-if="noResultsFound" class="empty-state">
                    <h3>No Results Found</h3>
                    <p>There are no drugs matching "{{ searchQuery }}"</p>
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
