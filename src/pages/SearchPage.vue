<template>
  <div class="container mt-4">
    <h1 class="title text-center mb-4">Recipe Search</h1>
    
    <!-- Search Box and Filters -->
    <div class="card mb-4">
      <div class="card-body">
        <form @submit.prevent="searchRecipes">
          <!-- Search Input -->
          <div class="mb-3">
            <label for="searchQuery" class="form-label">Search for recipes:</label>
            <div class="input-group">
              <input type="text" class="form-control" id="searchQuery" v-model="state.searchQuery" placeholder="Enter recipe name...">
              <button class="btn btn-primary" type="submit">Search</button>
            </div>
          </div>
          
          <div class="row">
            <!-- Number of Results -->
            <div class="col-md-3 mb-3">
              <label for="recipesNum" class="form-label">Number of results:</label>
              <select class="form-select" id="recipesNum" v-model="state.recipesNum">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
            
            <!-- Cuisine Filter -->
            <div class="col-md-3 mb-3">
              <label for="cuisine" class="form-label">Cuisine:</label>
              <select class="form-select" id="cuisine" v-model="state.cuisine">
                <option value="">Any</option>
                <option value="african">African</option>
                <option value="american">American</option>
                <option value="asian">Asian</option>
                <option value="british">British</option>
                <option value="cajun">Cajun</option>
                <option value="caribbean">Caribbean</option>
                <option value="chinese">Chinese</option>
                <option value="eastern european">Eastern European</option>
                <option value="european">European</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="greek">Greek</option>
                <option value="indian">Indian</option>
                <option value="irish">Irish</option>
                <option value="italian">Italian</option>
                <option value="japanese">Japanese</option>
                <option value="jewish">Jewish</option>
                <option value="korean">Korean</option>
                <option value="latin american">Latin American</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="mexican">Mexican</option>
                <option value="middle eastern">Middle Eastern</option>
                <option value="nordic">Nordic</option>
                <option value="southern">Southern</option>
                <option value="spanish">Spanish</option>
                <option value="thai">Thai</option>
                <option value="vietnamese">Vietnamese</option>
              </select>
            </div>
            
            <!-- Diet Filter -->
            <div class="col-md-3 mb-3">
              <label for="diet" class="form-label">Diet:</label>
              <select class="form-select" id="diet" v-model="state.diet">
                <option value="">Any</option>
                <option value="gluten free">Gluten Free</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="lacto-vegetarian">Lacto-Vegetarian</option>
                <option value="ovo-vegetarian">Ovo-Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="pescetarian">Pescetarian</option>
                <option value="paleo">Paleo</option>
                <option value="primal">Primal</option>
                <option value="low fodmap">Low FODMAP</option>
                <option value="whole30">Whole30</option>
              </select>
            </div>
            
            <!-- Intolerance Filter -->
            <div class="col-md-3 mb-3">
              <label for="intolerance" class="form-label">Intolerance:</label>
              <select class="form-select" id="intolerance" v-model="state.intolerance">
                <option value="">None</option>
                <option value="dairy">Dairy</option>
                <option value="egg">Egg</option>
                <option value="gluten">Gluten</option>
                <option value="grain">Grain</option>
                <option value="peanut">Peanut</option>
                <option value="seafood">Seafood</option>
                <option value="sesame">Sesame</option>
                <option value="shellfish">Shellfish</option>
                <option value="soy">Soy</option>
                <option value="sulfite">Sulfite</option>
                <option value="tree nut">Tree Nut</option>
                <option value="wheat">Wheat</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
    
     <!-- Loading Spinner -->
    <div v-if="state.loading" class="d-flex justify-content-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Results Section -->
    <div v-else-if="sortedRecipes.length > 0">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Search Results ({{ sortedRecipes.length }})</h2>
        <div class="btn-group" role="group">
          <button
            type="button"
            class="btn"
            :class="state.sortBy === 'time' ? 'btn-primary' : 'btn-outline-primary'"
            @click="state.sortBy = 'time'"
          >
            Sort by Time
          </button>
          <button
            type="button"
            class="btn"
            :class="state.sortBy === 'popularity' ? 'btn-primary' : 'btn-outline-primary'"
            @click="state.sortBy = 'popularity'"
          >
            Sort by Popularity
          </button>
        </div>
      </div>

      <RecipesList
        :recipes="sortedRecipes"
        :recipesPerPage="Number(state.recipesNum)"
        sourceType="search"
        :showCount="false"
        noResultsMessage="No recipes found matching your search criteria."
      />
    </div>

    <!-- No Results Message -->
    <div v-else-if="state.searched && sortedRecipes.length === 0" class="text-center my-5">
      <div class="alert alert-info">
        <i class="bi bi-info-circle me-2"></i>
        No recipes found matching your search criteria. Please try different search terms or filters.
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="state.submitError" class="alert alert-danger mt-3">
      {{ state.submitError }}
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed } from "vue";
import axios from "axios";
import RecipesList from "../components/RecipesList.vue";

export default {
  name: "SearchPage",
  components: {
    RecipesList,
  },
  setup() {
    const state = reactive({
      searchQuery: "",
      recipesNum: 5,
      cuisine: "",
      diet: "",
      intolerance: "",
      recipes: [],
      loading: false,
      searched: false,
      sortBy: null,
      submitError: null,
    });

    // Computed sorted recipes
    const sortedRecipes = computed(() => {
      const base = [...state.recipes];
      if (state.sortBy === "time") {
        return base.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
      } else if (state.sortBy === "popularity") {
        return base.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
      }
      return base;
    });

    async function searchRecipes() {
      state.submitError = null;
      state.loading = true;

      try {
        const res = await axios.get("http://localhost:3000/recipes/search", {
          params: {
            search: state.searchQuery,
            number: state.recipesNum,
            cuisine: state.cuisine || undefined,
            diet: state.diet || undefined,
            intolerance: state.intolerance || undefined,
          },
          withCredentials: true,
        });

        state.recipes = res.data || [];
        state.searched = true;
        saveSearchToLocalStorage();
      } catch (err) {
        console.error(err);
        state.submitError =
          err.response?.data?.message || "Failed to search recipes.";
        state.recipes = [];
      } finally {
        state.loading = false;
      }
    }

    function saveSearchToLocalStorage() {
      const data = {
        searchQuery: state.searchQuery,
        recipesNum: state.recipesNum,
        cuisine: state.cuisine,
        diet: state.diet,
        intolerance: state.intolerance,
        recipes: state.recipes,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem("lastRecipeSearch", JSON.stringify(data));
    }

    function loadLastSearch() {
      try {
        const saved = localStorage.getItem("lastRecipeSearch");
        if (saved) {
          const data = JSON.parse(saved);
          state.searchQuery = data.searchQuery || "";
          state.recipesNum = data.recipesNum || 5;
          state.cuisine = data.cuisine || "";
          state.diet = data.diet || "";
          state.intolerance = data.intolerance || "";
          state.recipes = data.recipes || [];
          if (state.recipes.length > 0) state.searched = true;
        }
      } catch (err) {
        console.error("Failed to load last search", err);
      }
    }

    onMounted(() => {
      loadLastSearch();
    });

    return {
      state,
      searchRecipes,
      sortedRecipes,
    };
  },
};
</script>

<style scoped>
.title {
  color: #d1925e;
}

.form-control:focus,
.form-select:focus {
  border-color: #d1925e;
  box-shadow: 0 0 0 0.25rem rgba(209, 146, 94, 0.25);
}

.btn-primary {
  background-color: #d1925e;
  border-color: #d1925e;
}

.btn-primary:hover,
.btn-primary:focus {
  background-color: #c17f45;
  border-color: #c17f45;
}

.btn-outline-primary {
  color: #d1925e;
  border-color: #d1925e;
}

.btn-outline-primary:hover,
.btn-outline-primary:focus {
  background-color: #d1925e;
  color: white;
}
</style>