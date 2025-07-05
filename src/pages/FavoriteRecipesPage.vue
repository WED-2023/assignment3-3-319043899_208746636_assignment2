<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">My Favorite Recipes</h1>
    <div class="row">
      <div class="col-12">
        <RecipePreviewList 
          title="Favorite Recipes" 
          type="favorite" 
          :showCount="true"
          class="favorite-recipes-list"
          noResultsMessage="You haven't added any recipes to favorites yet." 
        />
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "@/components/RecipePreviewList.vue";

export default {
  name: "FavoriteRecipesPage",
  components: {
    RecipePreviewList
  },
  data() {
    return {
      // We don't need to define favorites here because RecipePreviewList will handle fetching them
    };
  },
  created() {
    // No need to fetch recipes here as RecipePreviewList will handle it based on type="favorite"
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
  background: #ff6b6b;
  margin: 15px auto 0;
}

.favorite-recipes-list {
  margin-top: 2rem;
}
</style>
