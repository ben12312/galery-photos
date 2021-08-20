<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand-lg">
        <router-link to="/"
          ><a class="navbar-brand" href="#">Home</a></router-link
        >
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link v-if="isLogin" to="/my-movies"
                ><a class="nav-link" href="#">Watch List</a></router-link
              >
            </li>
            <li class="nav-item">
              <router-link v-if="isLogin" to="/information"
                ><a class="nav-link" href="#">Movie News</a></router-link
              >
            </li>
          </ul>

          <router-link v-if="!isLogin" to="/login"
            ><a class="navbar-brand" href="#">Login</a></router-link
          >
          <router-link v-if="!isLogin" to="/register"
            ><a class="navbar-brand" href="#">Register</a></router-link
          >
          <a
            @click.prevent="logout"
            v-if="isLogin"
            class="navbar-brand"
            href="#"
            >Logout</a
          >
        </div>
      </nav>
    </div>

    <router-view />

    <div class="fixed-bottom">
      <footer class="text-center text-lg-start">
        <div class="text-muted p-3" style="background-color: #383838"></div>
      </footer>
    </div>
  </div>
</template>

<script>
import router from "./router/index";

export default {
  components: {},
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit("changeisLogin", false);
      router.push("/login");
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters.getisLogin;
    },
  },
  created() {
    if (localStorage.access_token) {
      this.$store.commit("changeisLogin", true);
    } else {
      this.$store.commit("changeisLogin", false);
    }
  },
};
</script>

<style>
body {
  background: #383838;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #abadaf;
}

#nav a {
  font-weight: bold;
  color: #b7b7b8;
}

#nav a.router-link-exact-active {
  color: #4c58c5;
}
</style>
