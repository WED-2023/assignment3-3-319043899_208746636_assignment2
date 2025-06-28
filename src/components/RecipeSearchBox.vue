<template>
  <form @submit.prevent="onSubmit" class="p-4 bg-white rounded shadow-sm">
    <!-- Search Input -->
    <div class="mb-4">
      <label for="searchQuery" class="form-label fw-bold">Search for recipes:</label>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          id="searchQuery"
          v-model="state.searchQuery"
          placeholder="Enter recipe name..."
        />
        <button class="btn btn-primary" :disabled="state.loading">
  <span v-if="!state.loading">Search</span>
  <span v-else>
    <span class="spinner-border spinner-border-sm me-2" role="status"></span>
    Loading...
  </span>
</button>
      </div>
    </div>

    <!-- Filters Row -->
    <div class="row">
      <!-- Number of Results -->
      <div class="col-md-3 mb-3">
        <label for="recipesNum" class="form-label fw-bold">Number of results:</label>
        <select class="form-select rounded-pill px-4" id="recipesNum" v-model="state.recipesNum">
          <option v-for="num in [1, 5, 10, 15]" :key="num" :value="num">{{ num }}</option>
        </select>
      </div>

      <!-- Cuisine -->
      <div class="col-md-3 mb-3">
        <label for="cuisine" class="form-label fw-bold">Cuisine:</label>
        <select class="form-select rounded-pill px-4" id="cuisine" v-model="state.cuisine">
          <option value="">Any</option>
          <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">
            {{ cuisine }}
          </option>
        </select>
      </div>

      <!-- Diet -->
      <div class="col-md-3 mb-3">
        <label for="diet" class="form-label fw-bold">Diet:</label>
        <select class="form-select rounded-pill px-4" id="diet" v-model="state.diet">
          <option value="">Any</option>
          <option v-for="diet in diets" :key="diet" :value="diet">
            {{ diet }}
          </option>
        </select>
      </div>

      <!-- Intolerance -->
      <div class="col-md-3 mb-3">
        <label for="intolerance" class="form-label fw-bold">Intolerance:</label>
        <select class="form-select rounded-pill px-4" id="intolerance" v-model="state.intolerance">
          <option value="">None</option>
          <option v-for="item in intolerances" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
    </div>
  </form>
</template>

<script setup>
import { reactive, defineEmits } from "vue";

// Define emits for component communication
const emit = defineEmits(['results-found', 'loading-change']);

// Reactive state
const state = reactive({
    searchQuery: "",
    recipesNum: 5,
    cuisine: "",
    diet: "",
    intolerance: "",
    loading: false,
    recipes: [],
  });
  const cuisines= [
    "African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese",
    "Eastern European", "European", "French", "German", "Greek", "Indian", "Irish",
    "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean",
    "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"
  ]
  const diets = [
    "Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian",
    "Vegan", "Pescetarian", "Paleo", "Primal", "Low FODMAP", "Whole30"
  ]
  const intolerances = [
    "Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish",
    "Soy", "Sulfite", "Tree Nut", "Wheat"
  ]

  const onSubmit = async () => {
      state.loading = true;
      emit('loading-change', true);
        try {
            console.log("searching recipes with:", state.searchQuery, state.recipesNum, state.cuisine, state.diet, state.intolerance);          
            const res = await window.axios.get('/recipes/search', {
            params: {
                query: state.searchQuery,
                number: state.recipesNum,
                cuisine: state.cuisine,
                diet: state.diet,
                intolerance: state.intolerance
            }
          });
          console.log("searching recipes response:", res);
          const recipes = Array.isArray(res.data) ? res.data : (res.data.recipes || []);
          state.recipes = [];
          state.recipes.push(...recipes);
          console.log("search recipes:", state.recipes);
          emit('results-found', [...state.recipes]);
          
          if(recipes.length === 0) {
            window.toast("Search Results", "No recipes found matching your criteria", "info");
          }
          window.store.searchRecipes = [...state.recipes];
          sessionStorage.setItem('searchRecipes', JSON.stringify(state.recipes));
        } catch (err) {
          window.toast("Search Error", "Failed to fetch recipes. Please try again.", "danger");
          console.log("Error searching recipes:", err);
        } finally {
          state.loading = false;
          emit('loading-change', false);
        }
    };

  

</script>

<style scoped>

</style>
