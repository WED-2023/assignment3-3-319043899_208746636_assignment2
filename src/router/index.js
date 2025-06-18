import Main from "../pages/MainPage.vue";
import NotFound from "../pages/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../pages/RegisterPage.vue"),
  },
  {
    path: "/Login",
    name: "login",
    component: () => import("../pages/LoginPage.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../pages/SearchPage.vue"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("../pages/RecipeViewPage.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../pages/AboutPage.vue"),
  },
  {
    path: "/create-recipe",
    name: "createRecipe",
    component: () => import("../pages/CreateRecipePage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/favorite-recipes",
    name: "favoriteRecipes",
    component: () => import("../pages/FavoriteRecipesPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/my-recipes",
    name: "myRecipes",
    component: () => import("../pages/MyRecipesPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/family-recipes",
    name: "familyRecipes",
    component: () => import("../pages/FamilyRecipesPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: NotFound,
  }
];

export default routes;
