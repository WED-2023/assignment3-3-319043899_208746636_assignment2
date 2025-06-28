<template>
  <div class="container mt-4" style="max-width: 500px;">
    <h2 class="mb-4">Register</h2>
    <b-form @submit.prevent="register">

      <!-- Username -->
      <b-form-group label="Username" label-for="username">
        <b-form-input
          id="username"
          v-model="state.username"
          @blur="v$.username.$touch()"
          :state="v$.username.$dirty ? !v$.username.$error : null"
        />
        <b-form-invalid-feedback v-if="v$.username.$dirty && v$.username.$error">
          <div v-if="v$.username.required.$invalid">Username is required.</div>
          <div v-else-if="v$.username.minLength.$invalid">Username must be at least 3 characters.</div>
          <div v-else-if="v$.username.maxLength.$invalid">Username must be at most 8 characters.</div>
          <div v-else-if="v$.username.alpha.$invalid">Username must contain only english letters.</div>
        </b-form-invalid-feedback>
        <!-- <pre>{{ v$.username }}</pre> Add this line here for debugging -->

      </b-form-group>

      <!-- First Name -->
      <b-form-group label="First Name" label-for="firstName">
        <b-form-input
          id="firstName"
          v-model="state.firstName"
          @blur="v$.firstName.$touch()"
          :state="v$.firstName.$dirty ? !v$.firstName.$error : null"
        />
        <b-form-invalid-feedback v-if="v$.firstName.$dirty && v$.firstName.$error">
          First name is required.
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Last Name -->
      <b-form-group label="Last Name" label-for="lastName">
        <b-form-input
          id="lastName"
          v-model="state.lastName"
          @blur="v$.lastName.$touch()"
          :state="v$.lastName.$dirty ? !v$.lastName.$error : null"
        />
        <b-form-invalid-feedback v-if="v$.lastName.$error">
          Last name is required.
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Email -->
      <b-form-group label="Email" label-for="email">
        <b-form-input
          id="email"
          v-model="state.email"
          type="email"
          @blur="v$.email.$touch()"
          :state="v$.email.$dirty ? !v$.email.$error : null"
        />
        <b-form-invalid-feedback v-if="v$.email.$error">
          Valid email is required.
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Country -->
      <b-form-group label="Country" label-for="country">
        <b-form-select
          id="country"
          v-model="state.country"
          :options="countries"
          @change="v$.country.$touch()"
        />
        <b-form-invalid-feedback v-if="v$.country.$error">
          Country is required.
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Password -->
      <b-form-group label="Password" label-for="password">
        <b-form-input
          id="password"
          type="password"
          v-model="state.password"
          @blur="v$.password.$touch()"
          :state="v$.password.$dirty ? !v$.password.$error : null"
        />
        <b-form-invalid-feedback v-if="v$.password?.$dirty && v$.password?.$error">
          <div v-if="v$.password.required.$invalid">Password is required.</div>
          <div v-else-if="v$.password.minLength.$invalid || !v$.password.maxLength.$invalid">
            Password must be 5–10 characters.
          </div>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Confirm Password -->
      <b-form-group label="Confirm Password" label-for="confirmedPassword">
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="state.confirmedPassword"
          @blur="v$.confirmedPassword.$touch()"
          :state="v$.confirmedPassword.$dirty ? !v$.confirmedPassword.$error : null"
        />
        <b-form-invalid-feedback v-if="v$.confirmedPassword?.$dirty && v$.confirmedPassword?.$error">
          <div v-if="v$.confirmedPassword.required.$invalid">Confirmation is required.</div>
          <div v-else-if="v$.confirmedPassword.sameAsPassword.$invalid">
            Passwords do not match.
          </div>
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="success" class="w-100">Register</b-button>

      <b-alert
        variant="danger"
        class="mt-3"
        dismissible
        v-if="state.submitError"
        show
      >
        Registration failed: {{ state.submitError }}
      </b-alert>

      <div class="mt-2">
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </div>
    </b-form>
  </div>
</template>

<script>
import { computed,reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength, alpha, sameAs, email as emailValidator} from '@vuelidate/validators';
import rawCountries from '../assets/countries.json';
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

    const rules = {
      username: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(8),
        alpha,
      },
      firstName: { required },
      lastName: { required },
      country: { required },
      email: {
        required,
        email: emailValidator,
      },
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(10),
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs(passwordRef),
      },
    };

    const v$ = useVuelidate(rules, state);

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
      countries: ['Select a country', ...rawCountries],
      register,
      v$,
    };
  },
};
</script>


