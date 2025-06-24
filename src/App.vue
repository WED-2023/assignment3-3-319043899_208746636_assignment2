<template>
  <div id="app">
    <NavBar @open-create-recipe="openCreateModal" />
    <CreateRecipePage ref="CreateRecipePage" />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import CreateRecipePage from "./pages/CreateRecipePage.vue";
import { getCurrentInstance } from 'vue';

export default {
  name: "App",
  components: { NavBar, CreateRecipePage },
  setup() {
    const internalInstance = getCurrentInstance();
    const store = internalInstance.appContext.config.globalProperties.store;
    const toast = internalInstance.appContext.config.globalProperties.toast;
    const router = internalInstance.appContext.config.globalProperties.$router;

    const logout = () => {
      store.logout();
      toast("Logout", "User logged out successfully", "success");
      router.push("/").catch(() => {});
    };

    return { store, logout };
  },
  methods: {
    openCreateModal() {
      this.$refs.CreateRecipePage?.show();
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}
</style>
