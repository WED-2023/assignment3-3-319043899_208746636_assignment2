<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">My Recipes Recipes</h1>
    <div class="row">
      <div class="col-12">
        <RecipePreviewList title="My Recipes" type="MyRecipes" :recipes="favorites" class="My Recipes center" />
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

  }
};
</script>

<style scoped>
</style>
