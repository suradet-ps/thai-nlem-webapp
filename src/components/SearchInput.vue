<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        modelValue: string;
        label?: string;
        id?: string;
    }>(),
    {
        label: "Drug_Name",
        id: "holo-input",
    },
);

const emit = defineEmits<{
    (e: "update:modelValue", val: string): void;
}>();

const inputHandler = (e: Event) => {
    emit("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>

<template>
    <div class="glitch-input-wrapper">
        <div class="input-container">
            <input
                type="text"
                :id="props.id"
                class="holo-input"
                placeholder=" "
                :value="props.modelValue"
                @input="inputHandler"
                required
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
            />
            <label :for="props.id" class="input-label" :data-text="props.label">
                {{ props.label }}
            </label>

            <div class="input-border"></div>
            <div class="input-scanline"></div>
            <div class="input-glow"></div>

            <div class="input-data-stream">
                <div
                    class="stream-bar"
                    v-for="i in 10"
                    :key="i"
                    :style="{ '--i': i }"
                ></div>
            </div>

            <div class="input-corners">
                <div class="corner corner-tl"></div>
                <div class="corner corner-tr"></div>
                <div class="corner corner-bl"></div>
                <div class="corner corner-br"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.glitch-input-wrapper {
    --bg-color: var(--color-bg);
    --primary-color: var(--color-primary);
    --secondary-color: var(--color-secondary);
    --text-color: var(--color-text-primary);
    --font-family: var(--font-mono);
    --glitch-anim-duration: 0.4s;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-family: var(--font-family);
    padding: var(--spacing-4);
}

.input-container {
    position: relative;
    width: 100%;
}

.holo-input {
    width: 100%;
    height: 3.5rem;
    background: rgba(13, 13, 13, 0.7);
    border: none;
    outline: none;
    border-bottom: 2px solid #333;
    color: var(--primary-color);
    padding: 0 1rem;
    font-size: 1.1rem;
    caret-color: var(--primary-color);
    transition:
        background 0.3s ease,
        border-color 0.3s ease;
    z-index: 10;
}

.input-label {
    position: absolute;
    top: 1rem;
    left: 1rem;
    color: var(--text-color);
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    pointer-events: none;
    transition: all 0.3s ease;
}

.input-border,
.input-scanline,
.input-glow,
.input-corners {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
.input-border {
    border: 1px solid var(--color-border);
    opacity: 0.5;
    transition: all 0.3s ease;
}
.corner {
    position: absolute;
    width: 1rem;
    height: 1rem;
    border: 2px solid var(--primary-color);
    opacity: 0.4;
}
.corner-tl {
    top: -0.3rem;
    left: -0.3rem;
    border-right: none;
    border-bottom: none;
}
.corner-tr {
    top: -0.3rem;
    right: -0.3rem;
    border-left: none;
    border-bottom: none;
}
.corner-bl {
    bottom: -0.3rem;
    left: -0.3rem;
    border-right: none;
    border-top: none;
}
.corner-br {
    bottom: -0.3rem;
    right: -0.3rem;
    border-left: none;
    border-top: none;
}

.input-glow {
    background: radial-gradient(
        ellipse at center,
        rgba(0, 242, 234, 0.15) 0%,
        transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
}
.input-scanline {
    background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(0, 242, 234, 0.1) 48%,
        rgba(0, 242, 234, 0.3) 50%,
        rgba(0, 242, 234, 0.1) 52%,
        transparent 100%
    );
    opacity: 0;
}
.input-data-stream {
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    height: 0.3rem;
    display: flex;
    opacity: 0;
    transition: opacity 0.3s ease;
}
.stream-bar {
    flex-grow: 1;
    background-color: var(--primary-color);
    transform: scaleY(0);
    transform-origin: bottom;
}

.holo-input:focus + .input-label,
.holo-input:not(:placeholder-shown) + .input-label {
    top: -1.5rem;
    left: 0;
    font-size: 0.8rem;
    opacity: 1;
    color: var(--primary-color);
}
.holo-input:focus {
    border-color: transparent;
}
.holo-input:focus ~ .input-border {
    opacity: 1;
    border-color: rgba(0, 242, 234, 0.5);
}
.holo-input:focus ~ .input-glow {
    opacity: 1;
}
.holo-input:focus ~ .input-scanline {
    animation: scan-vertical 4s linear infinite;
}
.holo-input:focus ~ .input-data-stream {
    opacity: 1;
}
.holo-input:focus ~ .input-data-stream .stream-bar {
    animation: data-pulse 2s infinite;
    animation-delay: calc(var(--i) * 0.1s);
}

@keyframes scan-vertical {
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 0;
        transform: translateY(100%);
    }
}
@keyframes data-pulse {
    0%,
    100% {
        transform: scaleY(0.2);
        opacity: 0.3;
    }
    50% {
        transform: scaleY(1);
        opacity: 0.9;
    }
}
</style>
