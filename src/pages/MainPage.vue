<template>
  <div class="container">
    <h1 class="title">Main Page</h1>

    <RecipePreviewList 
      title="Random Recipes" 
      type="random" 
      class="RandomRecipes center"
      :isMainPage="true"
      :showCount="false" 
    />

    <div v-if="!store.username" class="mt-4">
      <LoginPage />
    </div>

    <RecipePreviewList
      v-if="store.username"
      title="Last Viewed Recipes"
      type="lastViewed"
      :isMainPage="true"
      :showCount="false"
      :class="{
        RandomRecipes: true,
        center: true
      }"
    />
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';
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

    return { store };
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
