<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">My Recipes</h1>
    <div class="row mb-3">
      <div class="col-12 text-end">
        <router-link to="/create-recipe" class="btn btn-success">Create New Recipe</router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div v-if="userRecipes.length === 0" class="text-center">
          <p>You haven't created any recipes yet.</p>
          <router-link to="/create-recipe" class="btn btn-primary">Create Your First Recipe</router-link>
        </div>
        <div v-else>
          <RecipePreviewList :recipes="userRecipes" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";

export default {
  name: "MyRecipesPage",
  components: {
    RecipePreviewList
  },
  data() {
    return {
      userRecipes: [] // This will be populated with API data in a real application
    };
  },
  created() {
    // Placeholder for fetching user recipes
    // In a real app, this would be an API call
    this.userRecipes = [
      {
        id: 101,
        title: "My Homemade Pizza",
        readyInMinutes: 60,
        image: "https://spoonacular.com/recipeImages/homemade-pizza.jpg",
        aggregateLikes: 42
      },
      {
        id: 102,
        title: "My Special Pasta",
        readyInMinutes: 25,
        image: "https://spoonacular.com/recipeImages/special-pasta.jpg",
        aggregateLikes: 38
      }
    ];
  }
};
</script>

<style scoped>
</style>
