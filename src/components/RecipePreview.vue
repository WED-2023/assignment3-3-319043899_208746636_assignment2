<template>

  <div class="card h-100 text-decoration-none position-relative recipe-card">
    <img
      v-if="recipe.picture"
      :src="recipe.picture"
      class="card-img-top recipe-image clickable-image"
      alt="Recipe image"
      @click="handleClick"
    />
    <div v-if="recipe.isWatched" class="watched-ribbon">
      <span class="watched-ribbon-text">Watched</span>
    </div>
    <div class="card-body d-flex flex-column text-center">
      <!-- Content Area (flexbox will push this up if needed) -->
      <div class="content-area">
        <h5 class="card-title">{{ recipe.name }}</h5>
        <div class="d-flex justify-content-around align-items-center mb-2 info-icons-row">
          <span class="info-icon" title="Time to Make">
            <i class="bi bi-clock"></i>
            <span class="icon-label">{{ recipe.timeToMake }} min</span>
          </span>
          <span class="info-icon" title="Popularity">
            <i class="bi bi-heart-fill"></i>
            <span class="icon-label">{{ recipe.popularity }}</span>
          </span>
          <!-- Gluten Free icon - always display this right after Popularity -->
          <span class="info-icon" title="Gluten Free">
            <i v-if="recipe.isGlutenFree" class="bi bi-patch-check-fill gluten-yes"></i>
            <i v-else class="bi bi-x-circle gluten-no"></i>
            <span class="icon-label">{{ recipe.isGlutenFree ? 'GF' : 'NGF' }}</span>
          </span>
          <!-- Only display Diet Category if it exists and is vegan/vegetarian -->
          <span v-if="recipe.dietCategory && (recipe.dietCategory.toLowerCase().includes('vegan') || recipe.dietCategory.toLowerCase().includes('vegetarian'))" class="info-icon" title="Diet Category">
            <i v-if="recipe.dietCategory.toLowerCase().includes('vegan')" class="bi bi-leaf vegan-leaf"></i>
            <i v-else-if="recipe.dietCategory.toLowerCase().includes('vegetarian')" class="bi bi-egg-fried"></i>
            <span class="icon-label">{{ recipe.dietCategory }}</span>
          </span>
        </div>
      </div>
      
      <!-- Favorite Button Area (always at the bottom) -->
      <div class="favorite-button-container mt-auto">
        <div class="d-flex justify-content-center align-items-center favorite-row">
          <button
            class="btn btn-link p-0 m-0 align-baseline favorite-btn"
            @click.stop="toggleFavorite"
            :aria-label="recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'"
          >
            <span :class="recipe.isFavorite ? 'favorite' : 'not-favorite'">
              <i v-if="recipe.isFavorite" class="bi bi-star-fill favorite-star"></i>
              <i v-else class="bi bi-star not-favorite-star"></i>
            </span>
          </button>
        </div>
      </div>
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

      if (this.sourceType==="favorite"){
        sessionStorage.setItem('currentRecipe', JSON.stringify(this.recipe));
      }
      else if (this.sourceType === "MyRecipes"){
        sessionStorage.setItem('currentRecipe', JSON.stringify(this.recipe));
      }
      
      this.$router.push({
        path: `/recipe/${this.recipe.recipe_id}`,
        query: { source: this.sourceType }
      });

    }catch(err) {
      console.error("API call failed", err);
      window.toast("Error", "Something went wrong while tracking the view", "danger");
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
.favorite-star {
  color: #ffd700 !important; /* yellow */
  font-size: 2rem;
  filter: drop-shadow(0 0 0.5px #111) drop-shadow(0 0 1.5px #111);
}
.not-favorite-star {
  color: #fff !important;
  font-size: 2rem;
  filter: drop-shadow(0 0 0.5px #111) drop-shadow(0 0 1.5px #111);
}
.position-relative {
  position: relative;
}
.watched-ribbon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  overflow: hidden;
  pointer-events: none;
  z-index: 2;
}
.watched-ribbon-text {
  position: absolute;
  left: -60px;
  top: 28px;
  width: 240px;
  background: linear-gradient(90deg, #adb5bd 70%, #f8f9fa 100%);
  color: #495057;
  font-weight: 600;
  font-size: 1.05rem;
  text-align: center;
  padding: 4px 0;
  border-radius: 6px;
  box-shadow: 0 2px 10px #adb5bd22;
  letter-spacing: 1.5px;
  border: 1.5px solid #adb5bd;
  opacity: 0.92;
  transform: rotate(-30deg);
  box-sizing: border-box;
  text-shadow: 0 1px 2px #fff8, 0 0.5px 0 #adb5bd88;
}
.info-icons-row {
  margin-bottom: 0.5rem;
}
.info-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.1rem;
  min-width: 48px;
}
.info-icon i {
  font-size: 1.5rem;
  margin-bottom: 2px;
}
.icon-label {
  font-size: 0.85rem;
  color: #444;
  font-weight: 500;
}
.gluten-yes {
  color: #198754;
}
.gluten-no {
  color: #dc3545;
}
.vegan-leaf {
  color: #43a047 !important;
  font-size: 1.5rem;
}

/* Card layout styles for fixed favorite button at bottom */
.recipe-card {
  display: flex;
  flex-direction: column;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-area {
  flex-grow: 1;
}

.favorite-button-container {
  padding-top: 10px;
}

.favorite-row {
  margin-bottom: 0 !important;
}
</style>
