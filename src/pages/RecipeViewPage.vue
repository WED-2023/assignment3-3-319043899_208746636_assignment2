<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.name }}</h1>
        <img :src="recipe.picture" class="center" alt="Recipe Image" />
        <div class="mt-2 text-muted" v-html="recipe.description"></div>      </div>
      <div class="recipe-body">
        <div class="mb-3">
          <strong>Cuisine:</strong> {{ recipe.cuisine }}<br>
          <strong>Diet Category:</strong> {{ recipe.dietCategory }}<br>
          <strong>Dishes:</strong> {{ recipe.dishes }}<br>
          <strong>Time to Make:</strong> {{ recipe.timeToMake }} minutes<br>
          <strong>Likes:</strong> {{ recipe.popularity }}<br>
          <strong>Gluten Free:</strong> {{ recipe.isGlutenFree ? 'Yes' : 'No' }}<br>
          <strong>Favorite:</strong>
          <button
            class="btn btn-link p-0 m-0 align-baseline favorite-btn"
            @click="toggleFavorite"
            :aria-label="recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'"
          >
            <span :class="recipe.isFavorite ? 'favorite' : 'not-favorite'">
              <span v-if="recipe.isFavorite">❤️</span>
              <span v-else>🤍</span>
            </span>
          </button>
          <br>
          <strong>Watched:</strong> {{ recipe.isWatched ? 'Yes' : 'No' }}<br>
        </div>
        <div class="mb-3">
          <strong>Ingredients:</strong>
          <ul>
            <li v-for="(ingredient, idx) in recipe.ingredients" :key="idx">
              {{ ingredient }}
            </li>
          </ul>
        </div>
        <div class="mb-3">
          <strong>Instructions:</strong>
          <ol>
            <li v-for="(instruction, idx) in recipe.instructions" :key="idx">
              {{ instruction }}
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading recipe...</p>
    </div>
  </div>
</template>
  
  <script>
//import { _ } from 'core-js';

  export default {
    data() {
      return {
        recipe: null
      };
    },
    async created(){
        const recipeId = parseInt(this.$route.params.recipeId);
        const sourceType = this.$route.query.source;

        try{
          let _recipe = null;

          switch (sourceType) {
            case "random": {
              this.loadRecipesFromSession('randomRecipes');
              const randomArr = Array.isArray(this.$root.store.randomRecipes) ? this.$root.store.randomRecipes : [];
              _recipe = randomArr.find(r => r.recipe_id === recipeId);
              console.log("Random recipe:", _recipe);
              break;
            }
            case "lastViewed": {
              this.loadRecipesFromSession('lastViewedRecipes');
              const lastViewedArr = Array.isArray(this.$root.store.lastViewedRecipes) ? this.$root.store.lastViewedRecipes : [];
              _recipe = lastViewedArr.find(r => r.recipe_id === recipeId);
              console.log("Last viewed recipe:", _recipe);
              break;
            }
            case "favorite": {


                const recipeFromSession = sessionStorage.getItem('currentRecipe');
                if (recipeFromSession) {
                  _recipe = JSON.parse(recipeFromSession);
                  console.log("Favorite recipe loaded from sessionStorage:", _recipe);
                } else {
                  _recipe = null;
                  console.warn("No favorite recipe found in sessionStorage");
                }


              console.log("Favorite recipe:", _recipe);
              break;
            }

            // case "search":
            //   _recipe = this.$root.store.searchResults?.find(r => r.recipe_id === recipeId);
            //   break;

            case "MyRecipes":{
                const recipeFromSession = sessionStorage.getItem('currentRecipe');
                if (recipeFromSession) {
                  _recipe = JSON.parse(recipeFromSession);
                  console.log("Favorite recipe loaded from sessionStorage:", _recipe);
                } else {
                  _recipe = null;
                  console.warn("No favorite recipe found in sessionStorage");
                }
                break;
              }

            default:
              console.warn("Unknown sourceType:", sourceType);
              break;
          }   
          if (_recipe) {
            // Extract instructions from analyzedInstructions
            let instructions = [];
            if (_recipe.analyzedInstructions && Array.isArray(_recipe.analyzedInstructions)) {
              instructions = _recipe.analyzedInstructions
                .map(fstep => fstep.steps)
                .reduce((a, b) => [...a, ...b], [])
                .map(step => step.step);
            }
            this.recipe = {
              ..._recipe,
              instructions
            };
          }
          console.log("Recipe found in store:", this.recipe);


        }catch (error) {
          console.error("Error fetching recipe:", error);
          this.$router.replace("/NotFound");
        }
    },
    methods: {
      loadRecipesFromSession(key) {
        if (!Array.isArray(this.$root.store[key]) || this.$root.store[key].length === 0) {
          const fromSession = sessionStorage.getItem(key);
        if (fromSession) {
          this.$root.store[key] = JSON.parse(fromSession);
        } else {
          this.$root.store[key] = [];
        }
      }
    },

      async toggleFavorite() {
        const userId = sessionStorage.getItem('user_id');
        if (!userId) {
          window.toast("Error", "You have to log in to add recipes to favorites", "danger");
          return;
        }
        try {
          await window.axios.post("http://localhost:3000/users/favorites", {
            recipeId: this.recipe.recipe_id
          }, { withCredentials: true });
          this.recipe.isFavorite = !this.recipe.isFavorite;
        } catch (err) {
          window.toast("Error", "You have already added this recipe to your favorites", "danger");
        }
      },
    }
  };
  </script>
  
  <style scoped>
  .wrapper {
    display: flex;
  }
  .wrapped {
    width: 50%;
  }
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
  /* .recipe-header{
  
  } */
  </style>
