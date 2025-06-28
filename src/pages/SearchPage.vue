<template>
  <div class="container my-4">
    <!-- Search Box Section -->
    <div class="row mb-4">
      <div class="col-12">
        <RecipeSearchBox 
          @results-found="handleResults" 
          @loading-change="isLoading = $event" 
        />
      </div>
    </div>

    <!-- Loading Indicator -->
    <div v-if="isLoading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Searching for recipes...</p>
    </div>

    <!-- Results Section -->
    <div v-else>
      <!-- If search has been performed -->
      <RecipesList 
        v-if="hasSearched"
        :recipes="recipes" 
        :loading="false"
        title="Search Results"
        :showCount="true"
        sourceType="search"
        noResultsMessage="Try different search terms or filters"
      >
        <template #empty>
          <i class="bi bi-search fs-1 text-muted"></i>
          <h3 class="mt-3">No recipes found</h3>
          <p class="text-muted">Try different search terms or filters</p>
        </template>
      </RecipesList>
      
      <!-- Initial State Message -->
      <div v-else class="text-center my-5 p-5 bg-light rounded">
        <i class="bi bi-search fs-1 text-muted"></i>
        <h3 class="mt-3">Search for Recipes</h3>
        <p class="text-muted">Use the search box above to find recipes</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import RecipeSearchBox from '../components/RecipeSearchBox.vue';
import RecipesList from '../components/RecipesList.vue';

// State management
const recipes = ref([]);
const isLoading = ref(false);
const hasSearched = ref(false);

// Handler for search results
const handleResults = (searchResults) => {
  hasSearched.value = true;
  isLoading.value = false;
  recipes.value = searchResults;
  
  // Log the search results for debugging
  console.log(`Received ${searchResults.length} search results`);
};


</script>

<style scoped>

h2 {
  font-weight: 600;
  color: #333;
}

.bg-light {
  background-color: #f8f9fa !important;
  border-radius: 1rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

/* Animation for smooth loading state transitions */
.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
