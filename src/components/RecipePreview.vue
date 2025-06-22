<template>

  <div class="card h-100 text-decoration-none" @click="handleClick">
    <img
      v-if="recipe.picture"
      :src="recipe.picture"
      class="card-img-top recipe-image"
      alt="Recipe image"
    />
    <div class="card-body text-center">
      <h5 class="card-title">{{ recipe.name }}</h5>
      <p class="card-text">{{ recipe.timeToMake }}</p>
      <p class="card-text">{{ recipe.popularity }} likes</p>
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
</style>
