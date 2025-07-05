<template>
  <div class="container">
    <h1 class="title text-center mb-4">My Recipe App</h1>

    <div class="row">
      <!-- Left Column - Random Recipes -->
      <div class="col-md-6">
        <div class="column-header mb-3">
          <h2 class="text-center">Explore Our Recipes</h2>
          <div class="d-flex justify-content-center align-items-center">
            <p class="text-muted mb-0 me-2">Discover delicious recipes to try today!</p>
            <button class="refresh-btn" @click="refreshRandomRecipes" title="Get new recipes">
              <i class="bi bi-arrow-repeat"></i> New Random Recipes
            </button>
          </div>
        </div>
        <RecipePreviewList 
          ref="randomRecipesRef"
          title="" 
          type="random" 
          class="RandomRecipes vertical-list"
          :isMainPage="true"
          :showCount="false" 
        />
      </div>

      <!-- Right Column - Login or Last Viewed -->
      <div class="col-md-6">
        <div class="column-header mb-3">
          <h2 class="text-center" v-if="store.username">Your Recent Activity</h2>
          <h2 class="text-center" v-else>Join Our Community</h2>
          <p class="text-center text-muted mb-2" v-if="store.username">Recipes you've recently viewed</p>
          <p class="text-center text-muted mb-2" v-else>Log in to save your favorite recipes and track your culinary journey!</p>
        </div>

        <!-- Show login form if not logged in -->
        <div v-if="!store.username" class="login-wrapper pt-2 pb-1">
          <div class="login-container">
            <div class="login-header">
              <i class="bi bi-person-circle login-icon"></i>
              <h3>Welcome Back!</h3>
            </div>
            <LoginPage class="custom-login" />
            <div class="signup-section text-center mt-3 pt-3 border-top">
              <p class="mb-2">New here? Join our community today!</p>
              <router-link to="/register" class="signup-btn">
                <i class="bi bi-person-plus"></i> Create an Account
              </router-link>
            </div>
          </div>
        </div>

        <!-- Show last viewed recipes if logged in -->
        <RecipePreviewList
          v-if="store.username"
          title=""
          type="lastViewed"
          :isMainPage="true"
          :showCount="false"
          class="RandomRecipes vertical-list"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from 'vue';
import RecipePreviewList from "../components/RecipePreviewList.vue";
import LoginPage from "./LoginPage.vue";

export default {
  components: {
    RecipePreviewList,
    LoginPage
  },
  setup() {
    const internalInstance = getCurrentInstance();
    const store = internalInstance.appContext.config.globalProperties.store;
    const randomRecipesRef = ref(null);

    const refreshRandomRecipes = async () => {
      try {
        if (randomRecipesRef.value) {
          // Call a method in the RecipePreviewList component to refresh random recipes
          await randomRecipesRef.value.fetchRecipes(3); // Fetch 3 new random recipes
        }
      } catch (error) {
        console.error("Failed to refresh recipes:", error);
        // You could add a toast notification here if you have one
      }
    };

    return { 
      store,
      randomRecipesRef,
      refreshRandomRecipes
    };
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}

.column-header {
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.5rem;
}

.column-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  text-align: center; /* Center the column headers */
}

/* Refresh button styling */
.refresh-btn {
  background-color: transparent;
  color: #d1925e;
  border: 1px solid #d1925e;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  margin-left: 0.5rem; /* Add some space between text and button */
}

.refresh-btn:hover {
  background-color: #d1925e;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(209, 146, 94, 0.25);
}

.refresh-btn i {
  margin-right: 0.25rem;
}

.login-wrapper {
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  padding-bottom: 1rem;
}

.login-container {
  background-color: #f9f5f0; 
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 420px;
  border: 1px solid #e6e0d6; 
  border-bottom: 2px solid #d1925e; 
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

.login-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.login-icon {
  font-size: 2.5rem;
  color: #d1925e; /* Match NavBar accent color */
  margin-bottom: 1rem;
}

.login-header h3 {
  font-weight: 600;
  color: #444444; /* Match NavBar text color */
  margin-bottom: 0.75rem;
}

.login-header p {
  color: #6c757d;
  font-size: 0.95rem;
}

.custom-login :deep(.login-page h1) {
  display: none; /* Hide the default "Login" header since we have our own */
}

.custom-login :deep(.form-group) {
  margin-bottom: 1.25rem;
}

.custom-login :deep(label) {
  font-weight: 500;
  color: #444444; /* Match NavBar text color */
  margin-bottom: 0.5rem;
  display: block;
  letter-spacing: 0.5px; /* Match NavBar text style */
}

.custom-login :deep(.form-control) {
  border-radius: 0.5rem;
  padding: 0.6rem 1rem;
  border: 1px solid #e6e0d6; /* Match NavBar border color */
  background-color: white;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.custom-login :deep(.form-control:focus) {
  border-color: #d1925e; /* Match NavBar accent color */
  box-shadow: 0 0 0 0.25rem rgba(209, 146, 94, 0.25); /* Match NavBar accent color */
}

.custom-login :deep(.btn-primary) {
  border-radius: 0.5rem;
  padding: 0.6rem 0;
  font-weight: 500;
  transition: all 0.2s ease;
  width: 100%;
  margin-top: 1rem;
  background-color: #d1925e; /* Match NavBar accent color */
  border-color: #d1925e; /* Match NavBar accent color */
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.custom-login :deep(.btn-primary:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(209, 146, 94, 0.25); /* Match NavBar accent color */
  background-color: #c48350; /* Slightly darker shade of NavBar accent color */
  border-color: #c48350;
}

/* Sign-up button styling */
.signup-section {
  border-top-color: #e6e0d6;
}

.signup-section p {
  color: #444444;
  font-size: 0.9rem;
}

.signup-btn {
  display: inline-block;
  background-color: transparent;
  color: #d1925e;
  border: 1px solid #d1925e;
  border-radius: 0.5rem;
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.signup-btn:hover {
  background-color: #f5ede2;
  color: #c48350;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(209, 146, 94, 0.1);
}

.signup-btn i {
  margin-right: 0.5rem;
}

.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}

:deep(.blur .recipe-preview) {
  pointer-events: none;
  cursor: default;
}

/* Force vertical list layout */
:deep(.vertical-list .row) {
  flex-direction: column !important;
  align-items: center !important;
}

:deep(.vertical-list .row > div) {
  max-width: 80% !important; /* Make containers 20% more narrow */
  flex: 0 0 80% !important;
  width: 80% !important;
  margin-left: auto;
  margin-right: auto;
}

:deep(.vertical-list .recipe-preview) {
  margin-bottom: 1rem;
}

/* Target the card directly to ensure width constraints are applied */
:deep(.vertical-list .card) {
  width: 100%;
  max-width: 100%;
}

// Responsive adjustments
@media (max-width: 767.98px) {
  .col-md-6:first-child {
    margin-bottom: 2rem;
  }
}
</style>
