<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <!-- Logo and brand -->
      <div class="d-flex align-items-center">
        <img src="/logo.png" alt="Logo" style="height: 40px;" class="me-2" />
        <span class="navbar-brand fw-bold">My Recipes</span>
      </div>

      <!-- Hamburger menu for mobile -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navigation items -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- For everyone -->
          <li class="nav-item">
            <router-link class="nav-link" to="/">Recipes</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/search">Search</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          
          <!-- For logged-in users only -->
          <li class="nav-item" v-if="username">
            <router-link class="nav-link" to="/create-recipe">Create New Recipe</router-link>
          </li>
          
          <!-- Personal Area Dropdown (for logged-in users) -->
          <li class="nav-item dropdown" v-if="username">
            <a class="nav-link dropdown-toggle" href="#" id="personalDropdown" role="button" 
               data-bs-toggle="dropdown" aria-expanded="false">
              Personal Area
            </a>
            <ul class="dropdown-menu" aria-labelledby="personalDropdown">
              <li><router-link class="dropdown-item" to="/favorite-recipes">My Favorite Recipes</router-link></li>
              <li><router-link class="dropdown-item" to="/my-recipes">My Recipes</router-link></li>
              <li><router-link class="dropdown-item" to="/family-recipes">My Family Recipes</router-link></li>
            </ul>
          </li>
        </ul>
        
        <!-- Right-aligned items -->
        <div class="navbar-nav">
          <!-- For non-logged-in users -->
          <div v-if="!username" class="d-flex align-items-center">
            <span class="nav-item me-3">Hello Guest</span>
            <router-link class="nav-link me-2" to="/login">Login</router-link>
            <router-link class="nav-link" to="/register">Register</router-link>
          </div>
          
          <!-- For logged-in users -->
          <div v-else class="d-flex align-items-center">
            <span class="nav-item me-3">Hello, {{ username }}</span>
            <button class="btn btn-outline-danger" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import store from "../store.js";

export default {
  name: "NavBar",
  computed: {
    username() {
      return store.username;
    }
  },
  methods: {
    logout() {
      store.logout();
      this.$router.push("/login");
    }
  }
}
</script>

<style scoped>
.nav-link.router-link-active {
  font-weight: bold;
  color: #0d6efd;
}
</style>
