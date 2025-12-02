// src/stores/drugStore.ts

import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// --- Type Definition ---
export interface Drug {
  id: number;
  generic_name: string;
  dosage_forms: string[];
  ed_level: string | null;
}

// --- Constants ---
const API_ENDPOINT = 'https://thai-nlem-api.onrender.com/api/drugs/search';
const MIN_SEARCH_LENGTH = 2;

// Define the store
// 'drug' is the unique ID of this store
export const useDrugStore = defineStore('drug', () => {
  // --- State ---
  // Equivalent to `data` in Options API, managed by Pinia.
  const searchResults = ref<Drug[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const hasSearched = ref(false);

  // --- Getters ---
  // Computed properties for derived state.
  const noResultsFound = computed(() => {
    return searchResults.value.length === 0 && hasSearched.value;
  });

  // --- Actions ---
  // Methods that can mutate the state. Perfect for async operations.
  // We pass `query` as an argument instead of watching a ref.
  async function searchDrugs(query: string) {
    if (query.trim().length < MIN_SEARCH_LENGTH) {
      searchResults.value = [];
      hasSearched.value = false;
      return;
    }

    isLoading.value = true;
    hasSearched.value = true;
    error.value = null;

    try {
      const response = await fetch(
        `${API_ENDPOINT}?q=${encodeURIComponent(query)}`,
        // Note: AbortController is harder to manage in Pinia actions
        // without more complex state management. For this simple case,
        // we omit it, but it can be added if race conditions become an issue.
      );

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      searchResults.value = await response.json();
    } catch (err: any) {
      error.value = err.message || 'An unknown error occurred.';
      searchResults.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  // Expose state, getters, and actions
  return {
    searchResults,
    isLoading,
    error,
    hasSearched,
    noResultsFound,
    searchDrugs,
  };
});
