<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">My Family Recipes</h1>
    <div class="row">
      <div class="col-12">
        <RecipesList
          :recipes="familyRecipes"
          sourceType="family"
          :showCount="true"
          title="Family Recipes"
          noResultsMessage="You haven't added any family recipes yet."
          @update-recipe="updateFamilyRecipe"
        >
          <template #empty>
            <i class="bi bi-book fs-1 text-muted"></i>
            <h3 class="mt-3">No family recipes yet</h3>
            <p class="text-muted">Share your family's culinary traditions</p>
            <router-link to="/create-recipe" class="btn btn-primary mt-2">
              Add a Family Recipe
            </router-link>
          </template>
        </RecipesList>
      </div>
    </div>
  </div>
</template>

<script>
import RecipesList from "../components/RecipesList.vue";

export default {
  name: "FamilyRecipesPage",
  components: {
    RecipesList
  },
  data() {
    return {
      familyRecipes: [] // This will be populated with API data in a real application
    };
  },
  created() {
    // Placeholder for fetching family recipes
    // In a real app, this would be an API call
    this.familyRecipes = [
      {
        id: 201,
        title: "Grandma's Apple Pie",
        readyInMinutes: 90,
        image: "https://spoonacular.com/recipeImages/grandmas-pie.jpg",
        aggregateLikes: 156
      },
      {
        id: 202,
        title: "Mom's Secret Soup",
        readyInMinutes: 120,
        image: "https://spoonacular.com/recipeImages/secret-soup.jpg",
        aggregateLikes: 98
      }
    ];
  },
  methods: {
    // Handle recipe updates (e.g. from favorite toggle)
    updateFamilyRecipe(updatedRecipe) {
      const index = this.familyRecipes.findIndex(recipe => 
        recipe.id === updatedRecipe.id || recipe.recipe_id === updatedRecipe.recipe_id
      );
      
      if (index !== -1) {
        // Update the recipe in our local array
        this.familyRecipes[index] = updatedRecipe;
        console.log(`Updated family recipe ${updatedRecipe.id || updatedRecipe.recipe_id}`);
        
        // Update in session storage
        const familyRecipes = JSON.parse(sessionStorage.getItem('familyRecipes') || '[]');
        const storageIndex = familyRecipes.findIndex(recipe => 
          recipe.id === updatedRecipe.id || recipe.recipe_id === updatedRecipe.recipe_id
        );
        
        if (storageIndex !== -1) {
          familyRecipes[storageIndex] = updatedRecipe;
          sessionStorage.setItem('familyRecipes', JSON.stringify(familyRecipes));
        }
      }
    }
  }
};
</script>

<style scoped>
</style>
