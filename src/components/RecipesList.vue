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
        <div v-for="recipe in localRecipes" :key="recipe.recipe_id" class="col">
          <RecipePreview 
            :recipe="recipe" 
            :sourceType="sourceType"
            @toggle-favorite="handleToggleFavorite" 
          />
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
import { ref, watch } from 'vue';

const props = defineProps({
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

const emit = defineEmits(['favorite-updated', 'update-recipe']);

// Local copy of recipes for mutation
const localRecipes = ref([...props.recipes]);

// Update local recipes when props change
watch(() => props.recipes, (newRecipes) => {
  localRecipes.value = [...newRecipes];
}, { deep: true });

// Handle the toggle favorite action from the RecipePreview component
const handleToggleFavorite = (recipeId) => {
  console.log(`Recipe ${recipeId} favorites toggle in ${props.sourceType} list`);
  
  // Find the recipe in our list
  const recipeIndex = localRecipes.value.findIndex(recipe => recipe.recipe_id === recipeId);
  
  if (recipeIndex !== -1) {
    // Create a new updated recipe object
    const updatedRecipe = { ...localRecipes.value[recipeIndex] };
    
    // Toggle the favorite status
    updatedRecipe.isFavorite = !updatedRecipe.isFavorite;
    
    // Adjust popularity count
    if (updatedRecipe.isFavorite) {
      updatedRecipe.popularity += 1;
    } else {
      updatedRecipe.popularity -= 1;
    }
    
    // Update our local copy
    localRecipes.value[recipeIndex] = updatedRecipe;

    // Update the recipe in session storage based on the sourceType
    updateSessionStorage(props.sourceType, updatedRecipe);
    
    // Update store if needed
    updateStore(props.sourceType, updatedRecipe);
    
    // Emit event to parent components to update their recipe list
    emit('update-recipe', updatedRecipe);
    
    // Also emit favorite-updated for other components that might be listening
    emit('favorite-updated', {
      recipeId, 
      isFavorite: updatedRecipe.isFavorite,
      sourceType: props.sourceType
    });
  }
};

// Helper function to update session storage
const updateSessionStorage = (sourceType, updatedRecipe) => {
  let storageKey;
  
  // Determine which storage key to use based on source type
  switch (sourceType) {
    case 'search':
      storageKey = 'searchResults';
      break;
    case 'random':
      storageKey = 'randomRecipes';
      break;
    case 'lastViewed':
      storageKey = 'lastViewedRecipes';
      break;
    case 'favorite':
      storageKey = 'favoriteRecipes';
      break;
    case 'family':
      storageKey = 'familyRecipes';
      break;
    case 'myRecipes':
      storageKey = 'myRecipes';
      break;
    default:
      storageKey = 'recipes';
  }
  
  // Get current data from session storage
  const storedData = sessionStorage.getItem(storageKey);
  
  if (storedData) {
    try {
      const recipes = JSON.parse(storedData);
      
      // Find and update the recipe
      const recipeIndex = recipes.findIndex(recipe => recipe.recipe_id === updatedRecipe.recipe_id);
      
      if (recipeIndex !== -1) {
        recipes[recipeIndex] = updatedRecipe;
      }
      
      // Save back to session storage
      sessionStorage.setItem(storageKey, JSON.stringify(recipes));
      console.log(`Updated recipe ${updatedRecipe.recipe_id} in sessionStorage (${storageKey})`);
    } catch (error) {
      console.error('Error updating sessionStorage:', error);
    }
  }
};

// Helper function to update the Vuex store
const updateStore = (sourceType, updatedRecipe) => {
  // Only update store if window.store exists
  if (!window.store) return;
  
  try {
    // Determine which store property to update
    switch (sourceType) {
      case 'search':
        if (window.store.searchRecipes) {
          const recipeIndex = window.store.searchRecipes.findIndex(
            recipe => recipe.recipe_id === updatedRecipe.recipe_id
          );
          if (recipeIndex !== -1) {
            window.store.searchRecipes[recipeIndex] = updatedRecipe;
          }
        }
        break;
        
      case 'random':
        if (window.store.randomRecipes) {
          const recipeIndex = window.store.randomRecipes.findIndex(
            recipe => recipe.recipe_id === updatedRecipe.recipe_id
          );
          if (recipeIndex !== -1) {
            window.store.randomRecipes[recipeIndex] = updatedRecipe;
          }
        }
        break;
        
      case 'lastViewed':
        if (window.store.lastViewedRecipes) {
          const recipeIndex = window.store.lastViewedRecipes.findIndex(
            recipe => recipe.recipe_id === updatedRecipe.recipe_id
          );
          if (recipeIndex !== -1) {
            window.store.lastViewedRecipes[recipeIndex] = updatedRecipe;
          }
        }
        break;
        
      default:
        break;
    }
  } catch (error) {
    console.error('Error updating store:', error);
  }
};
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
