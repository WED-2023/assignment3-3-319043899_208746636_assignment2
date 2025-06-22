<template>

  <div class="card h-100 text-decoration-none" @click="handleClick">
    <img
      v-if="recipe.picture"
      :src="recipe.picture"
      class="card-img-top recipe-image clickable-image"
      alt="Recipe image"
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
          <i v-if="recipe.isWatched" class="bi bi-eye-fill"></i>
          <i v-else class="bi bi-eye-slash"></i>
        </span>
      </p>
      <p class="card-text mb-1">
        <strong>Favorite:</strong>
        <span :class="['icon-indicator', recipe.isFavorite ? 'favorite' : 'not-favorite']">
          <i v-if="recipe.isFavorite" class="bi bi-heart-fill"></i>
          <i v-else class="bi bi-heart"></i>
        </span>
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
      try{
      await window.axios.post("http://localhost:3000/users/lastViews", {
      recipeId: this.recipe.recipe_id
      }, { withCredentials: true });
      
      this.$router.push({
        path: `/recipe/${this.recipe.recipe_id}`,
        query: { source: this.sourceType }
      });


    }catch(err) {
      console.error("API call failed", err);
      window.toast("Error", "Something went wrong while tracking the view", "danger");
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
