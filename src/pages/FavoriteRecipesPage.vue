<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">My Favorite Recipes</h1>
    <div class="row">
      <div class="col-12">
        <RecipesList
          :recipes="favorites"
          sourceType="favorite"
          :showCount="true"
          noResultsMessage="You haven't added any favorite recipes yet."
        >
          <template #empty>
            <div class="text-center">
              <p>You haven't added any favorite recipes yet.</p>
              <router-link to="/" class="btn btn-primary">Explore Recipes</router-link>
            </div>
          </template>
        </RecipesList>
      </div>
    </div>
  </div>
</template>

<script>
import RecipesList from "../components/RecipesList.vue";

export default {
  name: "FavoriteRecipesPage",
  components: {
    RecipesList
  },
  data() {
    return {
      favorites: [] // This will be populated with API data in a real application
    };
  },
  created() {
    // Placeholder for fetching favorite recipes
    // In a real app, this would be an API call
    this.favorites = [
      {
        id: 1,
        title: "Sample Favorite Recipe 1",
        readyInMinutes: 30,
        image: "https://spoonacular.com/recipeImages/sample-1.jpg",
        aggregateLikes: 120
      },
      {
        id: 2, 
        title: "Sample Favorite Recipe 2",
        readyInMinutes: 45,
        image: "https://spoonacular.com/recipeImages/sample-2.jpg",
        aggregateLikes: 85
      }
    ];
  }
};
</script>

<style scoped>
</style>
