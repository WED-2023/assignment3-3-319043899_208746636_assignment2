<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Create New Recipe</h1>
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <form @submit.prevent="createRecipe">
          <div class="mb-3">
            <label for="recipeTitle" class="form-label">Recipe Title</label>
            <input type="text" class="form-control" id="recipeTitle" v-model="recipe.title" required>
          </div>
          
          <div class="mb-3">
            <label for="recipeImage" class="form-label">Image URL</label>
            <input type="url" class="form-control" id="recipeImage" v-model="recipe.image">
          </div>
          
          <div class="mb-3">
            <label for="recipeTime" class="form-label">Cooking Time (minutes)</label>
            <input type="number" class="form-control" id="recipeTime" v-model="recipe.readyInMinutes" required>
          </div>
          
          <div class="mb-3">
            <label for="recipeServings" class="form-label">Servings</label>
            <input type="number" class="form-control" id="recipeServings" v-model="recipe.servings" required>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Ingredients</label>
            <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="d-flex mb-2">
              <input type="text" class="form-control me-2" v-model="recipe.ingredients[index]">
              <button type="button" class="btn btn-danger" @click="removeIngredient(index)">Remove</button>
            </div>
            <button type="button" class="btn btn-secondary" @click="addIngredient">Add Ingredient</button>
          </div>
          
          <div class="mb-3">
            <label for="recipeInstructions" class="form-label">Instructions</label>
            <textarea class="form-control" id="recipeInstructions" rows="5" v-model="recipe.instructions" required></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary">Create Recipe</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateRecipePage",
  data() {
    return {
      recipe: {
        title: "",
        image: "",
        readyInMinutes: null,
        servings: null,
        ingredients: [""],
        instructions: ""
      }
    };
  },
  methods: {
    addIngredient() {
      this.recipe.ingredients.push("");
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
      if (this.recipe.ingredients.length === 0) {
        this.recipe.ingredients.push("");
      }
    },
    createRecipe() {
      alert("Recipe creation functionality will be implemented in the future");
      // To be implemented: API call to save the recipe
      this.$router.push("/my-recipes");
    }
  }
};
</script>

<style scoped>
</style>
