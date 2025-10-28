<script setup lang="ts">
import { computed } from "vue";

interface Drug {
    generic_name: string;
    dosage_forms: string[];
    ed_level: string | null;
}
const props = defineProps<{ drug: Drug }>();

const dosageText = computed(() => {
    if (!props.drug.dosage_forms || props.drug.dosage_forms.length === 0) {
        return "ไม่มีข้อมูล";
    }
    return props.drug.dosage_forms.join(", ");
});
</script>

<template>
    <article class="drug-card">
        <header class="card-header">
            <h2 class="drug-name">{{ drug.generic_name }}</h2>
            <span v-if="drug.ed_level" class="badge"
                >บัญชี {{ drug.ed_level }}</span
            >
        </header>
        <p class="dosage">รูปแบบยา: {{ dosageText }}</p>
    </article>
</template>

<style scoped>
.drug-card {
    background-color: var(--color-card-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    padding: var(--spacing-6);
    box-shadow: var(--shadow-soft);
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
}
.drug-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 25px rgba(0, 242, 234, 0.15);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-2);
}

.drug-name {
    color: var(--color-primary);
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.4;
}

.badge {
    background: rgba(0, 242, 234, 0.1);
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 500;
    white-space: nowrap;
    flex-shrink: 0;
}

.dosage {
    color: var(--color-text-secondary);
    margin: 0;
    font-size: 0.9rem;
}
</style>
