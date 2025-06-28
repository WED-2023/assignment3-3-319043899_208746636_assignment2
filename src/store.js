import { reactive } from 'vue';

const store = reactive({
  username: sessionStorage.getItem('username'),
  server_domain: 'http://localhost:3000',
  randomRecipes : {},
  lastViewedRecipes : {},
  favoriteRecipes: {},
  searchRecipes: {},
  login(username,user_id) {
    // localStorage.setItem('username', username);
    console.log('login details: ', username, user_id);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('user_id', user_id);
    this.username = username;
    console.log('login', this.username);
  },
  logout() {
    console.log('logout');
    // localStorage.removeItem('username');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user_id');
    this.username = undefined;
  },
});

export default store;
