<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">My Favorite Recipes</h1>
    <div class="row">
      <div class="col-12">
        <RecipePreviewList title="Favorites Recipes" type="favorite" :recipes="favorites" class="favorite center" />
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "@/components/RecipePreviewList.vue";
//import RecipesList from "../components/RecipesList.vue";

export default {
  name: "FavoriteRecipesPage",
  components: {
    RecipePreviewList
  },
  data() {
    return {
      favorites: [] // This will be populated with API data in a real application
    };
  },
  created() {
    // Placeholder for fetching favorite recipes
    // In a real app, this would be an API call

  }
};
</script>

<style scoped>
</style>
