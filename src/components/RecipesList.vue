<template>
  <div class="recipes-list">
    <!-- Title & Count Section (optional) -->
    <div v-if="showCount && recipes.length > 0" class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">{{ title }} <span class="badge bg-secondary ms-2">{{ recipes.length }}</span></h2>
      <slot name="actions"></slot>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading recipes...</p>
    </div>
    
    <!-- Content Section -->
    <template v-else>
      <!-- Grid of Recipes -->
      <div v-if="recipes.length > 0" class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        <div v-for="recipe in recipes" :key="recipe.recipe_id" class="col">
          <RecipePreview :recipe="recipe" :sourceType="sourceType" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center my-5 p-5 bg-light rounded">
        <slot name="empty">
          <i class="bi bi-clipboard-x fs-1 text-muted"></i>
          <h3 class="mt-3">No recipes found</h3>
          <p class="text-muted">{{ noResultsMessage }}</p>
        </slot>
      </div>
    </template>
  </div>
</template>

<script setup>
import RecipePreview from './RecipePreview.vue';

defineProps({
  // The array of recipe objects to display
  recipes: {
    type: Array,
    required: true,
    default: () => []
  },
  // Loading state
  loading: {
    type: Boolean,
    default: false
  },
  // Optional title for the recipes list
  title: {
    type: String,
    default: 'Recipes'
  },
  // Whether to show the count badge
  showCount: {
    type: Boolean,
    default: false
  },
  // Source type for recipe actions (e.g., "search", "favorite", "family")
  sourceType: {
    type: String,
    default: "general"
  },
  // Message to show when there are no recipes
  noResultsMessage: {
    type: String,
    default: "No recipes are available."
  }
});
</script>

<style scoped>
.recipes-list {
  margin-bottom: 2rem;
}

h2 {
  font-weight: 600;
  color: #333;
}

.badge {
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.4em 0.8em;
}

.bg-light {
  background-color: #f8f9fa !important;
  border-radius: 1rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
