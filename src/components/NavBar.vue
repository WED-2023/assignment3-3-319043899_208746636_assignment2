<template>
  <nav class="navbar navbar-expand-lg custom-navbar">
    <div class="container-fluid">
      <!-- Left Side: Hello Guest / User greeting -->
      <div class="navbar-left">
        <!-- For non-logged-in users -->
        <div v-if="!username" class="greeting-text">
          Hello Guest
        </div>
        
        <!-- For logged-in users -->
        <div v-else class="greeting-text">
          Hello, {{ username }}
        </div>
      </div>

      <!-- Center: Navigation items -->
      <div class="collapse navbar-collapse justify-content-center" id="navbarContent">
        <ul class="navbar-nav compact-nav">
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
    <button class="nav-link btn btn-link" type="button" @click="$emit('open-create-recipe')">Create New</button>
          </li>
          
          <!-- Personal Area Dropdown (for logged-in users) -->
          <li class="nav-item dropdown" v-if="username">
            <a class="nav-link dropdown-toggle" href="#" role="button" 
               data-bs-toggle="dropdown" aria-expanded="false">
              Personal Area
            </a>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/favorite-recipes">My Favorites</router-link></li>
              <li><router-link class="dropdown-item" to="/my-recipes">My Recipes</router-link></li>
              <li><router-link class="dropdown-item" to="/family-recipes">My Family Recipes</router-link></li>
            </ul>
          </li>
          
          <!-- Auth links for non-logged users -->
          <li class="nav-item" v-if="!username">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="!username">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
          
          <!-- Logout button for logged-in users -->
          <li class="nav-item" v-if="username">
            <button class="btn logout-btn p-0 px-2" @click="logout">Logout</button>
          </li>
        </ul>
      </div>

      <!-- Right Side: Logo and brand -->
      <div class="navbar-right d-flex align-items-center">
        <span class="navbar-brand fw-bold brand-text me-2">AI Recipes</span>
        <img :src="require('@/assets/logo.png')" alt="Logo" class="navbar-logo" />
      </div>
      
      <!-- Hamburger menu for mobile -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
        <span class="navbar-toggler-icon"></span>
      </button>
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
  mounted() {
    // Initialize Bootstrap dropdowns
    document.querySelectorAll('.dropdown-toggle').forEach(dropdown => {
      dropdown.addEventListener('click', function(event) {
        event.preventDefault();
        const dropdownMenu = this.nextElementSibling;
        if (dropdownMenu.classList.contains('show')) {
          dropdownMenu.classList.remove('show');
        } else {
          document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
          });
          dropdownMenu.classList.add('show');
        }
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
          menu.classList.remove('show');
        });
      }
    });
  },
  methods: {
    logout() {
      store.logout();
      window.location.href = '/';
    },
    navigateTo(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>
/* Custom navbar styling based on logo colors */
.custom-navbar {
  background-color: #f9f5f0; /* Light beige background similar to logo background */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border-bottom: 2px solid #d1925e; /* Warm orange-brown border accent */
  padding: 0.25rem 0.5rem; /* Reduced padding to close gap between logo and edges */
  min-height: 50px;
}

/* Reduced gaps between nav items */
.compact-nav .nav-item {
  margin: 0 2px;
}

/* Brand text styling */
.brand-text {
  color: #444444; 
  font-size: 1.3rem;
  letter-spacing: 0.5px;
}

/* Navigation link styling */
.nav-link {
  color: #444444 !important; 
  font-weight: 500;
  padding: 0.3rem 0.6rem; 
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #d1925e !important; 
}

/* Active link styling */
.nav-link.router-link-active {
  font-weight: bold;
  color: #d1925e !important;
  border-bottom: 2px solid #d1925e;
}

/* Greeting text styling */
.greeting-text {
  color: #444444;
  font-weight: 500;
  padding-left: 0.5rem;
}

/* Logo styling */
.navbar-logo {
  height: 55px; 
  margin-right: 0.25rem;
}

/* Navbar sections layout */
.navbar-left {
  display: flex;
  align-items: center;
  min-width: 120px;
}

.navbar-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 150px;
}

/* Dropdown menu styling */
.dropdown-menu {
  background-color: #f9f5f0;
  border: 1px solid #e6e0d6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  margin-top: 0.25rem;
  padding: 0.35rem 0;
}

.dropdown-item {
  color: #444444;
  padding: 0.35rem 0.75rem;
  transition: background-color 0.2s ease;
  font-size: 0.9rem;
  text-decoration: none;
}

.dropdown-item:hover {
  background-color: #f0e6d9;
  color: #d1925e;
}

.dropdown-item.active,
.dropdown-item:active {
  background-color: #d1925e;
  color: white;
}

/* Make the dropdown appear on hover as well */
.dropdown:hover .dropdown-menu {
  display: block;
}

/* Logout button styling */
.logout-btn {
  background-color: transparent;
  color: #d1925e;
  border: 1px solid #d1925e;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  margin: 0.3rem 0.6rem;
}

.logout-btn:hover {
  background-color: #d1925e;
  color: white;
}

/* Mobile navbar toggler */
.navbar-toggler {
  border-color: #d1925e;
  padding: 0.25rem;
}

.navbar-toggler:focus {
  box-shadow: 0 0 0 0.15rem rgba(209, 146, 94, 0.25);
}

/* Responsive adjustments */
@media (max-width: 991.98px) {
  .navbar-left, .navbar-right {
    min-width: auto;
  }
  
  .navbar-toggler {
    order: 3;
  }
  
  .navbar-right {
    order: 2;
  }
}
</style>
