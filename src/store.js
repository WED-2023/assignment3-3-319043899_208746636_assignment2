import { reactive } from 'vue';

const store = reactive({
  username: sessionStorage.getItem('username'),
  server_domain: 'http://localhost:3000',
  randomRecipes : {},
  lastViewedRecipes : {},
  login(username,user_id) {
    console.log('login details: ', username, user_id);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('user_id', user_id);
    this.username = username;
    console.log('login', this.username);
  },
  logout() {
    console.log('logout');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user_id');
    this.username = undefined;
  },
});

export default store;
