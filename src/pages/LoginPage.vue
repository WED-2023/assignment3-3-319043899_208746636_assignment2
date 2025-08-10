<template>
  <!-- Different markup based on whether it's embedded or standalone -->
  <div v-if="!embedded" class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>Login</h1>
        <div class="accent-line"></div>
      </div>
      
      <form @submit.prevent="login" class="login-form">
        <div class="form-group mb-4">
          <label class="form-label">Username</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-person"></i>
            </span>
            <input 
              v-model="state.username" 
              type="text" 
              class="form-control" 
              placeholder="Enter your username"
            />
          </div>
          <div v-if="v$.username.$error" class="form-error">
            <i class="bi bi-exclamation-circle me-1"></i>
            Username is required.
          </div>
        </div>
        
        <div class="form-group mb-4">
          <label class="form-label">Password</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-lock"></i>
            </span>
            <input 
              v-model="state.password" 
              type="password" 
              class="form-control" 
              placeholder="Enter your password"
            />
          </div>
          <div v-if="v$.password.$error" class="form-error">
            <i class="bi bi-exclamation-circle me-1"></i>
            Password is required (at least 6 characters).
          </div>
        </div>
        
        <button type="submit" class="btn custom-btn w-100">
          <i class="bi bi-box-arrow-in-right me-2"></i>
          Login
        </button>
        
        <div class="text-center mt-4">
          <p class="mb-0">Don't have an account?</p>
          <router-link to="/register" class="signup-link">
            Sign Up Here
          </router-link>
        </div>
      </form>
    </div>
  </div>
  
  <!-- Simplified version for embedded use -->
  <div v-else class="embedded-login-form">
    <form @submit.prevent="login">
      <div class="form-group mb-3">
        <label class="form-label">Username</label>
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-person"></i>
          </span>
          <input 
            v-model="state.username" 
            type="text" 
            class="form-control" 
            placeholder="Username"
          />
        </div>
        <div v-if="v$.username.$error" class="form-error">
          <i class="bi bi-exclamation-circle me-1"></i>
          Username is required.
        </div>
      </div>
      
      <div class="form-group mb-3">
        <label class="form-label">Password</label>
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-lock"></i>
          </span>
          <input 
            v-model="state.password" 
            type="password" 
            class="form-control" 
            placeholder="Password"
          />
        </div>
        <div v-if="v$.password.$error" class="form-error">
          <i class="bi bi-exclamation-circle me-1"></i>
          Password is required (at least 6 characters).
        </div>
      </div>
      
      <button type="submit" class="btn custom-btn w-100">
        <i class="bi bi-box-arrow-in-right me-2"></i>
        Login
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import store from '../store.js';

export default {
  name: "LoginPage",
  props: {
    embedded: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { expose }) {
    const state = reactive({
      username: '',
      password: '',
    });

    const rules = {
      username: { required },
      password: { required, minLength: minLength(6) },
    };

    const v$ = useVuelidate(rules, state);

    const login = async () => {
      if (await v$.value.$validate()) {
        try {
          const response = await window.axios.post('/Login', {
            username: state.username,
            password: state.password
          },{
            withCredentials: true  
          });
          // Expecting user_id in response.data.user_id
          const user_id = response.data.user_id;
          // window.store.login(state.username, user_id);
          store.login(state.username, user_id);
          window.location.href = 'http://localhost:8080';
        } catch (err) {
          const message = err.response?.data?.message || err.message || "Unknown error";
          window.toast("Login failed", message, "danger");
        }
      }
    };

    expose({ login });

    return { state, v$, login };
  }
};
</script>

<style scoped>
/* Styles for standalone login page */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem 1rem;
}

.login-card {
  width: 100%;
  max-width: 450px;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  border: 1px solid #e6e0d6;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  font-weight: 600;
  color: #444444;
  margin-bottom: 0.5rem;
}

.accent-line {
  height: 3px;
  width: 60px;
  background-color: #d1925e;
  margin: 0 auto;
}

.login-form {
  margin-top: 1rem;
}

/* Embedded login form styles (used in MainPage) */
.embedded-login-form {
  width: 100%;
}

.embedded-login-form .form-group {
  margin-bottom: 1rem;
}

/* Common form styles for both modes */
.form-label {
  font-weight: 500;
  color: #444444;
  margin-bottom: 0.5rem;
  display: block;
}

.input-group-text {
  background-color: #f9f5f0;
  border-color: #e6e0d6;
  color: #d1925e;
}

.form-control {
  border-color: #e6e0d6;
  padding: 0.6rem 0.75rem;
}

.form-control:focus {
  border-color: #d1925e;
  box-shadow: 0 0 0 0.25rem rgba(209, 146, 94, 0.25);
}

.form-error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.custom-btn {
  background-color: #d1925e;
  border: none;
  color: white;
  padding: 0.6rem 1.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.custom-btn:hover, .custom-btn:focus {
  background-color: #c07e4b;
  box-shadow: 0 0.25rem 0.5rem rgba(209, 146, 94, 0.25);
  transform: translateY(-2px);
}

.signup-link {
  color: #d1925e;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.signup-link:hover {
  color: #c07e4b;
  text-decoration: underline;
}

@media (max-width: 576px) {
  .login-card {
    padding: 2rem 1.5rem;
  }
}
</style>
