import { reactive } from 'vue';

const store = reactive({
  username: sessionStorage.getItem('username'),
  server_domain: 'http://localhost:3000',
  randomRecipes : {},
  lastViewedRecipes : {},
  login(username) {
    // localStorage.setItem('username', username);
    sessionStorage.setItem('username', username);
    this.username = username;
    console.log('login', this.username);
  },
  logout() {
    console.log('logout');
    // localStorage.removeItem('username');
    sessionStorage.removeItem('username');
    this.username = undefined;
  },
});

export default store;
