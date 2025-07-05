<template>
  <div class="recipe-preview-list">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="mb-0">{{ title }} <span v-if="showCount" class="badge bg-primary ms-2">{{ recipes.length }}</span></h3>
    </div>

    <div v-if="type === 'lastViewed' && !isLoggedIn">
      <LoginPage />
    </div>
    <div v-else>
      <!-- Loading state -->
      <div v-if="loading || isLoading" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading recipes...</p>
      </div>
      
      <!-- Empty state -->
      <div v-else-if="recipes.length === 0" class="text-center text-muted p-5 bg-light rounded">
        <i class="bi bi-clipboard-x fs-1 text-muted"></i>
        <h4 class="mt-3">No recipes to show</h4>
        <p>{{ noResultsMessage }}</p>
      </div>

      <!-- Grid of Recipes -->
      <div v-else :class="gridClasses">
        <div v-for="recipe in recipes" :key="recipe.recipe_id" class="col mb-4">
          <RecipePreview 
            class="recipePreview h-100" 
            :sourceType="type" 
            :recipe="recipe" 
            @toggle-favorite="handleToggleFavorite" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import LoginPage from "../pages/LoginPage.vue";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
    LoginPage,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "random",
    },
    // Whether this is displayed on the main page
    isMainPage: {
      type: Boolean,
      default: false
    },
    // Whether to show the count badge
    showCount: {
      type: Boolean,
      default: false
    },
    // Custom message for empty state
    noResultsMessage: {
      type: String,
      default: "No recipes are available."
    },
    // Loading state
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      recipes: [],
      isLoading: false, // Internal loading state
    };
  },
  computed: {
    isLoggedIn() {
      console.log("Checking login status:", this.$root.store.username);
      // Adjust according to your store logic
      return this.$root.store.username;
    },
    // Determine grid classes based on isMainPage prop
    gridClasses() {
      return {
        'row': true,
        'g-4': true,
        'row-cols-1': true,
        'row-cols-md-3': this.isMainPage, // 3 per row for main page
        'row-cols-md-2': !this.isMainPage, // 2 per row for medium screens
        'row-cols-lg-4': !this.isMainPage  // 4 per row for large screens if not main page
      };
    }
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
        console.log("Updating recipes for type:", this.type);
      if (this.type === "lastViewed") {
        if (!this.isLoggedIn) {
          this.recipes = [];
          return;
        }
        try {
          const response = await this.axios.get("http://localhost:3000/users/lastViews", { withCredentials: true });

          this.recipes = Array.isArray(response.data) ? response.data : (response.data.recipes || []);

        } catch (error) {
          console.log(error);
          this.recipes = [];
        }
        this.$root.store.lastViewedRecipes = [...this.recipes];
        sessionStorage.setItem('lastViewedRecipes', JSON.stringify(this.recipes));

      } else if (this.type === "random") {

        try {
        const response = await this.axios.get(
            this.$root.store.server_domain + "/recipes/random"
        );
        console.log("API response:", response.data);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        } catch (error) {
        console.log(error);
        }


    //when there are no points in spoonacular, we use the following code://
    // this.recipes = [
    //   {
    //     "recipe_id": 657968,
    //     "name": "Raw Carrot Cake",
    //     "picture": "https://img.spoonacular.com/recipes/657968-556x370.jpg",
    //     "timeToMake": "45 minutes",
    //     "popularity": 10,
    //     "dietCategory": "vegan",
    //     "isGlutenFree": true
    //   },
    //   {
    //     "recipe_id": 658509,
    //     "name": "Roasted Broccoli with Lemon and Garlic",
    //     "picture": "https://img.spoonacular.com/recipes/658509-556x370.jpg",
    //     "timeToMake": "25 minutes",
    //     "popularity": 18,
    //     "dietCategory": "vegetarian",
    //     "isGlutenFree": true
    //   },
    //   {
    //     "recipe_id": 661925,
    //     "name": "Strawberry and Nutella Cobbler",
    //     "picture": "https://img.spoonacular.com/recipes/661925-556x370.jpg",
    //     "timeToMake": "55 minutes",
    //     "popularity": 25,
    //     "dietCategory": "",
    //     "isGlutenFree": false
    //   }
    // ];

      } else if (this.type === "favorite") {
        // Fetch favorite recipes from API
        try {
          const response = await this.axios.get("http://localhost:3000/users/favorites", { withCredentials: true });
          this.recipes = Array.isArray(response.data) ? response.data : (response.data.recipes || []);
        } catch (error) {
          console.log(error);
          this.recipes = [];
        }

      } else if (this.type === "MyRecipes") {
        // Fetch user recipes from API
        try {
          const response = await this.axios.get("http://localhost:3000/users/myrecipes", { withCredentials: true });
          console.log("User recipes response:", response.data);
          this.recipes = Array.isArray(response.data) ? response.data : (response.data.recipes || []);
        } catch (error) {
          console.log(error);
          this.recipes = [];
        }
      }
      else {
        console.warn("Unknown type:", this.type);
        this.recipes = [];
      }
    },
    
    // Method to fetch new recipes (used by parent components)
    async fetchRecipes(count = 3) {
      this.isLoading = true;
      
      try {
        if (this.type === "random") {
          // Call the API with the count parameter
          try {
            const response = await this.axios.get(
              this.$root.store.server_domain + `/recipes/random?count=${count}`
            );
            console.log("API response for new random recipes:", response.data);
            const recipes = response.data;
            this.recipes = [];
            this.recipes.push(...recipes);
          } catch (error) {
            console.error("Error fetching random recipes:", error);
            
            // Fallback if API fails - generate some sample recipes
            this.recipes = [
              {
                "recipe_id": Math.floor(Math.random() * 1000000),
                "name": "Spicy Thai Basil Chicken",
                "picture": "https://img.spoonacular.com/recipes/593906-556x370.jpg",
                "timeToMake": "30 minutes",
                "popularity": 22,
                "dietCategory": "",
                "isGlutenFree": false
              },
              {
                "recipe_id": Math.floor(Math.random() * 1000000),
                "name": "Creamy Mushroom Risotto",
                "picture": "https://img.spoonacular.com/recipes/648417-556x370.jpg",
                "timeToMake": "40 minutes",
                "popularity": 15,
                "dietCategory": "vegetarian",
                "isGlutenFree": true
              },
              {
                "recipe_id": Math.floor(Math.random() * 1000000),
                "name": "Berry Smoothie Bowl",
                "picture": "https://img.spoonacular.com/recipes/655219-556x370.jpg",
                "timeToMake": "15 minutes",
                "popularity": 30,
                "dietCategory": "vegan",
                "isGlutenFree": true
              }
            ];
          }
        } else if (this.type === "lastViewed") {
          await this.updateRecipes();
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        this.isLoading = false;
      }
    },
    handleToggleFavorite(recipeId) {
      const recipe = this.recipes.find(r => r.recipe_id === recipeId);
      if (recipe) {
        recipe.isFavorite = !recipe.isFavorite;
        
        // Adjust popularity count for better visual feedback
        if (recipe.isFavorite) {
          recipe.popularity = (recipe.popularity || 0) + 1;
        } else if (recipe.popularity > 0) {
          recipe.popularity -= 1;
        }
        
        // Update session storage based on recipe type
        if (this.type === "lastViewed") {
          sessionStorage.setItem('lastViewedRecipes', JSON.stringify(this.recipes));
          
          // Update window.store if it exists
          if (window.store && window.store.lastViewedRecipes) {
            const index = window.store.lastViewedRecipes.findIndex(r => r.recipe_id === recipeId);
            if (index !== -1) {
              window.store.lastViewedRecipes[index] = {...recipe};
            }
          }
        } else if (this.type === "random") {
          sessionStorage.setItem('randomRecipes', JSON.stringify(this.recipes));
          
          // Update window.store if it exists
          if (window.store && window.store.randomRecipes) {
            const index = window.store.randomRecipes.findIndex(r => r.recipe_id === recipeId);
            if (index !== -1) {
              window.store.randomRecipes[index] = {...recipe};
            }
          }
        } else if (this.type === "search") {
          sessionStorage.setItem('searchRecipes', JSON.stringify(this.recipes));
          
          // Update window.store if it exists
          if (window.store && window.store.searchRecipes) {
            const index = window.store.searchRecipes.findIndex(r => r.recipe_id === recipeId);
            if (index !== -1) {
              window.store.searchRecipes[index] = {...recipe};
            }
          }
        }
        
        // Emit event for parent components that might be listening
        this.$emit('favorite-updated', {
          recipeId, 
          isFavorite: recipe.isFavorite,
          sourceType: this.type
        });
      }
    }
  },
};
</script>

<style scoped>
.recipe-preview-list {
  margin-bottom: 2rem;
}

h3 {
  font-weight: 600;
  color: #333;
}

.badge {
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.4em 0.8em;
}

.bg-light {
  background-color: #f8f9fa !important;
  border-radius: 1rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.recipePreview {
  transition: transform 0.2s;
}

.recipePreview:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
</style>
