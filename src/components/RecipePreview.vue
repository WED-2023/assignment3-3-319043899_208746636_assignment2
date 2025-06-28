<template>

  <div class="card h-100 text-decoration-none">
    <img
      v-if="recipe.picture"
      :src="recipe.picture"
      class="card-img-top recipe-image clickable-image"
      alt="Recipe image"
      @click="handleClick"
    />
    <div class="card-body text-center">
      <h5 class="card-title">{{ recipe.name }}</h5>
      <p class="card-text mb-1"><strong>Time:</strong> {{ recipe.timeToMake }}</p>
      <p class="card-text mb-1"><strong>Likes:</strong> {{ recipe.popularity }}</p>
      <p class="card-text mb-1"><strong>Diet:</strong> {{ recipe.dietCategory }}</p>
      <p class="card-text mb-1"><strong>Gluten Free:</strong> {{ recipe.isGlutenFree ? 'Yes' : 'No' }}</p>
      <p class="card-text mb-1">
        <strong>Watched:</strong>
        <span :class="['icon-indicator', recipe.isWatched ? 'watched' : 'not-watched']">
          <span v-if="recipe.isWatched">👁️</span>
          <span v-else>🙈</span>
        </span>
      </p>
      <p class="card-text mb-1">
        <strong>Favorite:</strong>
        <button
          class="btn btn-link p-0 m-0 align-baseline favorite-btn"
          @click.stop="toggleFavorite"
          :aria-label="recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        >
          <span :class="recipe.isFavorite ? 'favorite' : 'not-favorite'">
            <span v-if="recipe.isFavorite">❤️</span>
            <span v-else>🤍</span>
          </span>
        </button>
      </p>
    </div>
  </div>

</template>

<script>
export default {
  name: "RecipePreview",
  props: {
    recipe: {
      type: Object,
      required: true
    },
    sourceType:{
      type: String,
      default: "random"
    }
  },
  methods: {
    async handleClick() {
      try {
        console.log("Recipe clicked:", this.recipe.recipe_id);
        
        // Check if user is logged in before tracking view
        const userId = sessionStorage.getItem('user_id');
        
        if (userId) {
          // Only track view if user is logged in
          try {
            await window.axios.post("http://localhost:3000/users/lastViews", {
              recipeId: this.recipe.recipe_id
            }, { withCredentials: true });
          } catch (trackError) {
            console.error("Failed to track view:", trackError);
            // Don't show error toast to user, just log it
          }
        }
        
        // Always navigate to recipe details
        this.$router.push({
          path: `/recipe/${this.recipe.recipe_id}`,
          query: { source: this.sourceType }
        });
      } catch(err) {
        console.error("Navigation failed:", err);
        window.toast("Error", "Could not navigate to recipe details", "danger");
      }
    },
    async toggleFavorite() {
      // Check if user is logged in
      const userId = sessionStorage.getItem('user_id');
      if (!userId) {
        window.toast("Error", "You have to log in to add recipes to favorites", "danger");
        return;
      }
      try {
        await window.axios.post("http://localhost:3000/users/favorites", {
          recipeId: this.recipe.recipe_id
        }, { withCredentials: true });
        this.$emit('toggle-favorite', this.recipe.recipe_id);
      } catch (err) {
        window.toast("Error", "You have already added this recipe to your favorites ", "danger");
      }
    }
  }
}
</script>

<style scoped>
.recipe-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.clickable-image {
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.clickable-image:hover {
  box-shadow: 0 0 0 4px #0d6efd44;
  filter: brightness(0.95);
}
.icon-indicator {
  margin-left: 5px;
  font-size: 1.2em;
  vertical-align: middle;
}
.watched {
  color: #0d6efd;
}
.not-watched {
  color: #000000;
}
.favorite {
  color: #dc3545;
}
.not-favorite {
  color: #000000;
}
</style>
