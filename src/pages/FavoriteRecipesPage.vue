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
  color: #444444;
  margin-bottom: 1.5rem;
  position: relative;
  text-align: center;
}

h1:after {
  content: '';
  display: block;
  width: 80px;
  height: 3px;
  background: #d1925e; /* Match navbar accent color */
  margin: 15px auto 0;
}

.favorite-recipes-list {
  margin-top: 2rem;
  background-color: #f9f5f0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.05);
  border: 1px solid #e6e0d6;
}

.container {
  background-color: white;
  padding-top: 2rem;
  padding-bottom: 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.08);
}

@media (max-width: 767.98px) {
  .container {
    padding-top: 1rem;
    padding-bottom: 2rem;
  }
}
</style>
