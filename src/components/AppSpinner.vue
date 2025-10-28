<script setup lang="ts">
withDefaults(
    defineProps<{
        text?: string;
    }>(),
    {
        text: "Scanning data...",
    },
);
</script>

<template>
    <div
        class="spinner-container"
        role="status"
        aria-live="polite"
        :aria-label="text"
    >
        <div class="spinner">
            <div class="circle outer-circle"></div>
            <div class="circle inner-circle"></div>
        </div>
        <p class="loading-text">{{ text }}</p>
    </div>
</template>

<style scoped>
.spinner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-8);
    gap: var(--spacing-4);
    color: var(--color-primary);
}

.spinner {
    position: relative;
    width: 56px;
    height: 56px;
}

.circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 4px solid transparent;
}

.outer-circle {
    border-top-color: var(--color-primary);
    border-left-color: var(--color-primary);
    animation: spin-clockwise 1.2s cubic-bezier(0.6, 0, 0.4, 1) infinite;
}

.inner-circle {
    width: 70%;
    height: 70%;
    top: 15%;
    left: 15%;
    border-bottom-color: var(--color-secondary);
    border-right-color: var(--color-secondary);
    animation: spin-counter-clockwise 0.8s ease-in-out infinite;
}

.loading-text {
    font-family: var(--font-mono);
    letter-spacing: 0.05em;
    text-shadow: 0 0 5px rgba(0, 242, 234, 0.2);
    margin: 0;
}

@keyframes spin-clockwise {
    to {
        transform: rotate(360deg);
    }
}

@keyframes spin-counter-clockwise {
    to {
        transform: rotate(-360deg);
    }
}
</style>
