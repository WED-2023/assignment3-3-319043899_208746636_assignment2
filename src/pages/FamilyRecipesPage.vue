<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">My Family Recipes</h1>
    <div class="row">
      <div class="col-12">
        <div v-if="familyRecipes.length === 0" class="text-center">
          <p>You haven't added any family recipes yet.</p>
          <router-link to="/create-recipe" class="btn btn-primary">Add a Family Recipe</router-link>
        </div>
        <div v-else>
          <RecipePreviewList :recipes="familyRecipes" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";

export default {
  name: "FamilyRecipesPage",
  components: {
    RecipePreviewList
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
  }
};
</script>

<style scoped>
</style>
