<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">My Recipes</h1>
    <div class="row">
      <div class="col-12">
        <RecipePreviewList 
          title="My Recipes" 
          type="MyRecipes" 
          :showCount="true"
          class="my-recipes-list"
          noResultsMessage="You haven't created any recipes yet."
        />
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
      // We don't need to define recipes here because RecipePreviewList will handle fetching them
    };
  },
  created() {
    // No need to fetch recipes here as RecipePreviewList will handle it based on type="MyRecipes"
  }
};
</script>

<style scoped>
h1 {
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
  position: relative;
}

h1:after {
  content: '';
  display: block;
  width: 50px;
  height: 3px;
  background: #007bff;
  margin: 15px auto 0;
}

.my-recipes-list {
  margin-top: 2rem;
}
</style>
