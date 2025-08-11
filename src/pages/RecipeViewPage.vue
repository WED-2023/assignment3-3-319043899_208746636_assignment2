<template>
  <div class="container">
    <div v-if="recipe" class="recipe-view-container">
      <!-- Recipe Card -->
      <article class="recipe-card">
        <!-- Recipe Header Section -->
        <header class="recipe-header">
          <div class="recipe-title-section">
            <h1 class="recipe-title">{{ recipe.name }}</h1>
            <div class="recipe-description" v-html="recipe.description"></div>
            <div class="recipe-author" v-if="recipe.author">
              <i class="bi bi-person"></i> {{ recipe.author }}
              <span v-if="recipe.date" class="recipe-date">
                <i class="bi bi-calendar"></i> {{ recipe.date }}
              </span>
            </div>
          </div>
        </header>

        <!-- Image and Metadata Section -->
        <div class="image-metadata-section">
          <div class="image-container">
            <img 
              :src="recipe.picture || require('@/assets/logo.png')" 
              :alt="`${recipe.name} image`"
              class="recipe-image"
            />
          </div>
          
          <!-- Recipe Metadata -->
          <div class="recipe-metadata">
            <div class="metadata-item">
              <i class="bi bi-clock"></i>
              <span>{{ recipe.timeToMake }} minutes</span>
            </div>
            
            <div class="metadata-item">
              <i class="bi bi-heart"></i>
              <span>{{ recipe.popularity }} likes</span>
            </div>
            
            <div class="metadata-item">
              <i class="bi bi-tag"></i>
              <span>{{ recipe.cuisine }}</span>
            </div>
            
            <!-- Tags/Labels Section -->
            <div class="recipe-tags">
              <span v-if="recipe.isGlutenFree" class="recipe-tag">GF</span>
              <span v-if="recipe.dietCategory" class="recipe-tag">{{ recipe.dietCategory }}</span>
              <span v-if="recipe.dishes" class="recipe-tag">{{ recipe.dishes }}</span>
            </div>
            
            <!-- Favorite Button -->
            <button
              class="favorite-btn"
              @click="toggleFavorite"
              :aria-label="recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'"
            >
              <i :class="[recipe.isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart', 'favorite-icon']"></i>
              {{ recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites' }}
            </button>
          </div>
        </div>

        <!-- Ingredients and Instructions Section -->
        <div class="recipe-details-section">
          <!-- Ingredients Section -->
          <section class="recipe-ingredients-container">
            <h2 class="section-title">
              <i class="bi bi-list-check"></i> Ingredients
            </h2>
            <ul class="ingredients-list">
              <li v-for="(ingredient, idx) in recipe.ingredients" :key="idx" class="ingredient-item">
                <label class="ingredient-label">
                  <input type="checkbox" class="ingredient-checkbox">
                  <span class="ingredient-text">{{ ingredient }}</span>
                </label>
              </li>
            </ul>
          </section>
          
          <!-- Instructions Section -->
          <section class="recipe-instructions-container">
            <h2 class="section-title">
              <i class="bi bi-journal-text"></i> Instructions
            </h2>
            <ol class="instructions-list">
              <li v-for="(instruction, idx) in recipe.instructions" :key="idx" class="instruction-item">
                {{ instruction }}
              </li>
            </ol>
          </section>
        </div>
      </article>
    </div>
    <div v-else class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading recipe...</p>
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
              break;
            }
            case "lastViewed": {

              this.loadRecipesFromSession('lastViewedRecipes');
              const lastViewedArr = Array.isArray(this.$root.store.lastViewedRecipes) ? this.$root.store.lastViewedRecipes : [];
              _recipe = lastViewedArr.find(r => r.recipe_id === recipeId);
              break;
            }
            case "favorite": {
              const recipeFromSession = sessionStorage.getItem('currentRecipe');
              if (recipeFromSession) {
                _recipe = JSON.parse(recipeFromSession);
              } else {
                _recipe = null;
                console.warn("No favorite recipe found in sessionStorage");
              }
              break;
            }

            case "search": {
              // Defensive: ensure searchRecipes is an array
              if (!window.store.searchRecipes || !Array.isArray(window.store.searchRecipes)) {
                const searchFromSession = sessionStorage.getItem('searchRecipes');
                if (searchFromSession) {
                  window.store.searchRecipes = JSON.parse(searchFromSession);
                } else {
                  window.store.searchRecipes = [];
                }
              }
              _recipe = window.store.searchRecipes.find(r => r.recipe_id === recipeId);
              console.log("Search recipe:", _recipe);
              break;
            }
              
            case "user": {
              if (window.store.userRecipes && Array.isArray(window.store.userRecipes)) {
                _recipe = window.store.userRecipes.find(r => r.recipe_id === recipeId);
              }
              break;
            }

            case "MyRecipes":{
                const recipeFromSession = sessionStorage.getItem('currentRecipe');
                if (recipeFromSession) {
                  _recipe = JSON.parse(recipeFromSession);
                } else {
                  _recipe = null;
                  console.warn("No favorite recipe found in sessionStorage");
                }
                break;
              }
            case "family":{
              const recipeFromSession = sessionStorage.getItem('currentRecipe');
              if (recipeFromSession) {
                _recipe = JSON.parse(recipeFromSession);
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
/* Container Styling */
.recipe-view-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
}

/* Recipe Card */
.recipe-card {
  width: 100%;
  max-width: 1200px;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #e6e0d6;
  border-bottom: 3px solid #d1925e;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.15);
}

/* Recipe Header */
.recipe-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #f0f0f0;
  text-align: center;
}

.recipe-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #444444;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.recipe-description {
  font-size: 1.1rem;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.recipe-author {
  font-size: 0.95rem;
  color: #888888;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.recipe-date {
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 1px solid #e6e0d6;
}

/* Image and Metadata Section */
.image-metadata-section {
  display: flex;
  padding: 2rem;
  gap: 2rem;
  border-bottom: 1px solid #f0f0f0;
}

.image-container {
  flex: 0 0 60%;
}

.recipe-image {
  width: 100%;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  object-fit: cover;
  aspect-ratio: 16/9;
}

/* Recipe Metadata */
.recipe-metadata {
  flex: 1;
  background-color: #f9f5f0;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e6e0d6;
  height: fit-content;
}

.metadata-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: #555555;
}

.metadata-item i {
  color: #d1925e;
  margin-right: 0.75rem;
  font-size: 1.1rem;
}

/* Tags Section */
.recipe-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.recipe-tag {
  background-color: #d1925e;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Favorite Button */
.favorite-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: transparent;
  border: 1px solid #d1925e;
  color: #d1925e;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.favorite-btn:hover {
  background-color: #d1925e;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(209, 146, 94, 0.25);
}

.favorite-icon {
  margin-right: 0.5rem;
}

/* Recipe Details Section */
.recipe-details-section {
  display: flex;
  padding: 2rem;
  gap: 2rem;
}

.recipe-ingredients-container,
.recipe-instructions-container {
  flex: 1;
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #e6e0d6;
  padding: 1.5rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
}

/* Section Headings */
.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #444444;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.75rem;
}

.section-title i {
  color: #d1925e;
  margin-right: 0.75rem;
}

/* Ingredients Section */
.ingredients-list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 1rem;
}

.ingredient-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.ingredient-item:last-child {
  border-bottom: none;
}

.ingredient-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
}

.ingredient-checkbox {
  margin-right: 0.75rem;
  width: 1.2rem;
  height: 1.2rem;
  accent-color: #d1925e;
}

.ingredient-text {
  font-size: 1rem;
  color: #333333;
}

/* Instructions Section */
.instructions-list {
  padding-left: 1.2rem;
  margin-bottom: 1rem;
}

.instruction-item {
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  color: #333333;
  line-height: 1.6;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #d1925e;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.loading-text {
  color: #666666;
  font-size: 1.1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 992px) {
  .image-metadata-section {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .image-container {
    flex: 0 0 100%;
  }
  
  .recipe-metadata {
    width: 100%;
  }
  
  .recipe-details-section {
    flex-direction: column;
  }
  
  .recipe-ingredients-container,
  .recipe-instructions-container {
    width: 100%;
  }
  
  .recipe-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .recipe-details-section {
    gap: 1.5rem;
  }
}

@media (max-width: 576px) {
  .recipe-header {
    padding: 1.5rem 1rem;
  }
  
  .image-metadata-section,
  .recipe-details-section {
    padding: 1.5rem 1rem;
  }
  
  .recipe-title {
    font-size: 1.75rem;
  }
  
  .recipe-description {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.3rem;
  }
}
</style>
