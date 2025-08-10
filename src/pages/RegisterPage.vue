<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <h1>Create Account</h1>
        <div class="accent-line"></div>
      </div>
      
      <form @submit.prevent="register" class="register-form">
        <!-- Username -->
        <div class="form-group mb-3">
          <label class="form-label">Username</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-person"></i>
            </span>
            <input
              id="username"
              v-model="state.username"
              @blur="v$.username.$touch()"
              :class="['form-control', {'is-invalid': v$.username.$dirty && v$.username.$error}]"
              placeholder="Choose a username"
            />
          </div>
          <div v-if="v$.username.$dirty && v$.username.$error" class="form-error">
            <i class="bi bi-exclamation-circle me-1"></i>
            <span v-if="v$.username.required.$invalid">Username is required.</span>
            <span v-else-if="v$.username.minLength.$invalid">Username must be at least 3 characters.</span>
            <span v-else-if="v$.username.maxLength.$invalid">Username must be at most 8 characters.</span>
            <span v-else-if="v$.username.alpha.$invalid">Username must contain only English letters.</span>
          </div>
        </div>

        <!-- First Name & Last Name (in a row) -->
        <div class="row mb-3">
          <div class="col-md-6 mb-3 mb-md-0">
            <label class="form-label">First Name</label>
            <div class="input-group">
              <input
                id="firstName"
                v-model="state.firstName"
                @blur="v$.firstName.$touch()"
                :class="['form-control', {'is-invalid': v$.firstName.$dirty && v$.firstName.$error}]"
                placeholder="Your first name"
              />
            </div>
            <div v-if="v$.firstName.$dirty && v$.firstName.$error" class="form-error">
              <i class="bi bi-exclamation-circle me-1"></i>
              <span v-if="v$.firstName.required.$invalid">First name is required.</span>
              <span v-else-if="v$.firstName.alpha.$invalid">First name must contain only English letters.</span>
            </div>
          </div>
          
          <div class="col-md-6">
            <label class="form-label">Last Name</label>
            <div class="input-group">
              <input
                id="lastName"
                v-model="state.lastName"
                @blur="v$.lastName.$touch()"
                :class="['form-control', {'is-invalid': v$.lastName.$dirty && v$.lastName.$error}]"
                placeholder="Your last name"
              />
            </div>
            <div v-if="v$.lastName.$dirty && v$.lastName.$error" class="form-error">
              <i class="bi bi-exclamation-circle me-1"></i>
              <span v-if="v$.lastName.required.$invalid">Last name is required.</span>
              <span v-else-if="v$.lastName.alpha.$invalid">Last name must contain only English letters.</span>
            </div>
          </div>
        </div>

        <!-- Email -->
        <div class="form-group mb-3">
          <label class="form-label">Email Address</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-envelope"></i>
            </span>
            <input
              id="email"
              v-model="state.email"
              type="email"
              @blur="v$.email.$touch()"
              :class="['form-control', {'is-invalid': v$.email.$dirty && v$.email.$error}]"
              placeholder="Your email address"
            />
          </div>
          <div v-if="v$.email.$dirty && v$.email.$error" class="form-error">
            <i class="bi bi-exclamation-circle me-1"></i>
            Valid email is required.
          </div>
        </div>

        <!-- Country -->
        <div class="form-group mb-3">
          <label class="form-label">Country</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-globe"></i>
            </span>
            <select
              id="country"
              v-model="state.country"
              @change="v$.country.$touch()"
              :class="['form-select', {'is-invalid': v$.country.$dirty && v$.country.$error}]"
            >
              <option value="" disabled>Select your country</option>
              <option v-for="option in countryOptions" :key="option.value" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
          <div v-if="v$.country.$dirty && v$.country.$error" class="form-error">
            <i class="bi bi-exclamation-circle me-1"></i>
            Country is required.
          </div>
        </div>

        <!-- Password -->
        <div class="form-group mb-3">
          <label class="form-label">Password</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-lock"></i>
            </span>
            <input
              id="password"
              type="password"
              v-model="state.password"
              @blur="v$.password.$touch()"
              :class="['form-control', {'is-invalid': v$.password.$dirty && v$.password.$error}]"
              placeholder="Choose a password"
            />
          </div>
          <div v-if="v$.password.$dirty && v$.password.$error" class="form-error">
            <i class="bi bi-exclamation-circle me-1"></i>
            <span v-if="v$.password.required.$invalid">Password is required.</span>
            <span v-else-if="v$.password.minLength.$invalid">Password must be at least 5 characters.</span>
            <span v-else-if="v$.password.maxLength.$invalid">Password must be at most 10 characters.</span>
            <span v-else-if="v$.password.hasDigit.$invalid">Password must contain at least one digit.</span>
            <span v-else-if="v$.password.hasSpecial.$invalid">Password must contain at least one special character.</span>
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="form-group mb-4">
          <label class="form-label">Confirm Password</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-shield-lock"></i>
            </span>
            <input
              id="confirmedPassword"
              type="password"
              v-model="state.confirmedPassword"
              @blur="v$.confirmedPassword.$touch()"
              :class="['form-control', {'is-invalid': v$.confirmedPassword.$dirty && v$.confirmedPassword.$error}]"
              placeholder="Confirm your password"
            />
          </div>
          <div v-if="v$.confirmedPassword.$dirty && v$.confirmedPassword.$error" class="form-error">
            <i class="bi bi-exclamation-circle me-1"></i>
            <span v-if="v$.confirmedPassword.required.$invalid">Confirmation is required.</span>
            <span v-else-if="v$.confirmedPassword.sameAsPassword.$invalid">
              Passwords do not match.
            </span>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn custom-btn w-100">
          <i class="bi bi-person-plus me-2"></i>
          Create Account
        </button>

        <!-- Error Alert -->
        <div class="alert alert-danger mt-3" v-if="state.submitError">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          Registration failed: {{ state.submitError }}
        </div>

        <!-- Login Link -->
        <div class="text-center mt-4">
          <p class="mb-0">Already have an account?</p>
          <router-link to="/login" class="login-link">
            Log In Here
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength, alpha, sameAs, email as emailValidator, helpers } from '@vuelidate/validators';
// import rawCountries from '../assets/countries.json';
import { useRouter } from 'vue-router';

export default {
  name: 'RegisterPage',
  setup() {
    const router = useRouter();

    const state = reactive({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      password: '',
      confirmedPassword: '',
      submitError: null,
    });
    const passwordRef = computed(() => state.password);

    // Custom validators for password
    const hasDigit = helpers.withMessage(
      'Password must contain at least one digit.',
      value => /\d/.test(value || '')
    );
    const hasSpecial = helpers.withMessage(
      'Password must contain at least one special character.',
      value => /[!@#$%^&*(),.?":{}|<>\]/;'`~_+=-]/.test(value || '')
    );

    const rules = {
      username: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(8),
        alpha,
      },
      firstName: { required, alpha },
      lastName: { required, alpha },
      country: { required },
      email: {
        required,
        email: emailValidator,
      },
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(10),
        hasDigit,
        hasSpecial,
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs(passwordRef),
      },
    };

    const v$ = useVuelidate(rules, state);

    // --- Country list from API ---
    const countries = ref([]);
    const countryOptions = computed(() => [
      { value: '', text: 'Select a country' },
      ...countries.value.map(c => ({ value: c.name.common, text: c.name.common }))
    ]);
    onMounted(async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3');
        const data = await response.json();
        countries.value = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
      } catch (error) {
        console.error('Failed to load countries:', error);
      }
    });

    const register = async () => {
      console.log("Registering with state:", state);
      v$.value.$touch();
      console.log('dirty:', v$.value.password.$dirty, 'error:', v$.value.password.$error);

      const valid = await v$.value.$validate();
      console.log("Validation result:", v$.value.$errors);

      if (!valid) return;


      try {
        await window.axios.post('/Register', {
          username: state.username,
          firstname: state.firstName,
          lastname: state.lastName,
          country: state.country,
          password: state.password,
          email: state.email,
          profilePic:"None"



        });
        window.toast('Registration successful', 'You can now login', 'success');
        router.push('/Login');
      } catch (err) {
        if(err.response?.status === 409) {
          window.toast('Registration failed', 'Username or email already exists.', 'danger');
        } else if (err.response?.status === 400) {
          window.toast('Registration failed', 'Invalid input.', 'danger');
          //state.submitError = err.response.data.message || 'Invalid input.';
        } else {
          window.toast('Registration failed', 'Unexpected error.', 'danger');
        }
      }
    };

    return {
      state,
      countries,
      countryOptions,
      register,
      v$,
    };
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
}

.register-card {
  width: 100%;
  max-width: 600px;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  border: 1px solid #e6e0d6;
  margin: 2rem auto;
}

.register-header {
  text-align: center;
  margin-bottom: 2rem;
}

.register-header h1 {
  font-weight: 600;
  color: #444444;
  margin-bottom: 0.5rem;
}

.accent-line {
  height: 3px;
  width: 80px;
  background-color: #d1925e;
  margin: 0 auto;
}

.register-form {
  margin-top: 1rem;
}

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

.form-control, .form-select {
  border-color: #e6e0d6;
  padding: 0.6rem 0.75rem;
}

.form-control:focus, .form-select:focus {
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

.login-link {
  color: #d1925e;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.login-link:hover {
  color: #c07e4b;
  text-decoration: underline;
}

.alert-danger {
  background-color: #f8d7da;
  border-color: #f5c2c7;
  color: #842029;
}

/* Mobile responsive adjustments */
@media (max-width: 576px) {
  .register-card {
    padding: 2rem 1.5rem;
  }
}
</style>


