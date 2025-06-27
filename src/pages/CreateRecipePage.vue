<template>
  <BModal v-model="modalShow" id="create-recipe-modal" title="Create New Recipe" hide-footer size="lg" scrollable>
    <form @submit.prevent="createRecipe">
      <div class="mb-3">
        <label for="recipeTitle" class="form-label">Recipe Title</label>
        <input type="text" class="form-control" id="recipeTitle" v-model="recipe.name" required>
      </div>
      <div class="mb-3">
        <label for="recipeImage" class="form-label">Image URL</label>
        <input type="url" class="form-control" id="recipeImage" v-model="recipe.picture">
      </div>
      <div class="mb-3">
        <label for="recipeTime" class="form-label">Cooking Time (minutes)</label>
        <input type="number" class="form-control" id="recipeTime" v-model="recipe.timeToMake" required>
      </div>
      <div class="mb-3">
        <label for="recipeServings" class="form-label">dishes</label>
        <input type="number" class="form-control" id="recipeServings" v-model="recipe.dishes" required>
      </div>
      <div class="mb-3">
        <label for="dietCategory" class="form-label">Diet Category</label>
        <select class="form-control" id="dietCategory" v-model="recipe.dietCategory" required>
          <option value="none">None</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
        </select>
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="isGlutenFree" v-model="recipe.isGlutenFree">
        <label class="form-check-label" for="isGlutenFree">Gluten Free</label>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" v-model="recipe.description" rows="2" required></textarea>
      </div>
      <div class="mb-3">
        <label for="cuisine" class="form-label">Cuisine</label>
        <input type="text" class="form-control" id="cuisine" v-model="recipe.cuisine" required>
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
        <label class="form-label">Instructions</label>
        <div v-for="(instruction, idx) in instructions" :key="idx" class="d-flex mb-2">
          <textarea class="form-control me-2" v-model="instructions[idx]" rows="2" placeholder="Step description" required></textarea>
          <button type="button" class="btn btn-danger" @click="removeInstruction(idx)">Remove</button>
        </div>
        <button type="button" class="btn btn-secondary" @click="addInstruction">Add Step</button>
      </div>
      <button type="submit" class="btn btn-primary">Create Recipe</button>
    </form>
  </BModal>
</template>

<script>
import { ref } from 'vue';
import { BModal } from 'bootstrap-vue-3';

export default {
  name: "CreateRecipePage",
  components: { BModal },
  setup(_, { expose }) {
    const modalShow = ref(false);
    
    expose({
      show: () => {
        modalShow.value = true;
      }
    });
    return { modalShow };
  },
  data() {
    return {
      recipe: {
        name: "",
        picture: "",
        timeToMake: null,
        dishes: null,
        ingredients: [""],
        dietCategory: "none",
        isGlutenFree: false,
        description: "",
        cuisine: ""
      },
      instructions: [""]
    };
  },
  methods: {
    resetForm() {
      this.recipe = {
        name: "",
        picture: "",
        timeToMake: null,
        dishes: null,
        ingredients: [""],
        dietCategory: "none",
        isGlutenFree: false,
        description: "",
        cuisine: ""
      };
      this.instructions = [""];
    },
    addIngredient() {
      this.recipe.ingredients.push("");
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
      if (this.recipe.ingredients.length === 0) {
        this.recipe.ingredients.push("");
      }
    },
    addInstruction() {
      this.instructions.push("");
    },
    removeInstruction(index) {
      this.instructions.splice(index, 1);
      if (this.instructions.length === 0) {
        this.instructions.push("");
      }
    },
    async createRecipe() {
      const user_id = sessionStorage.getItem('user_id');
      const analyzedInstructions = [
        {
          name: "",
          steps: this.instructions
            .filter(step => step.trim() !== "")
            .map((step, idx) => ({
              number: idx + 1,
              step: step,
              ingredients: [],
              equipment: []
            }))
        }
      ];
      const recipeToSave = {
        ...this.recipe,
        analyzedInstructions,
        created_by: user_id
      };
      try {
        await this.axios.post(
          "http://localhost:3000/users/recipes",
          recipeToSave,
          { withCredentials: true }
        );
        this.$root.toast("Success", "Recipe created successfully!", "success");

        this.modalShow = false;
        this.resetForm();
        this.$router.push("/my-recipes");
      } catch (error) {
          const message = error.response?.data?.message || error.message || "An error occurred";
          this.$root.toast("Error", message, "danger");
      }
    }
  }
};
</script>

<style scoped>
</style>
