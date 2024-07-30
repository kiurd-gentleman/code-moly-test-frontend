<template>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
  </head>
  <body>
  <div id="app">
    <nav class="text-center">
      <ul>
<!--        //only auth user can access dashboard and logout-->

        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><a href="#" @click.prevent="logout">Logout</a></li>
      </ul>
    </nav>
    <router-view/>
  </div>
  </body>
  </html>

</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
/* Add some basic styling */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  //text-align: center;
  color: #2c3e50;
}

nav {
  padding: 16px;
  background-color: #000000;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 20px;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

nav ul li a:hover {
  text-decoration: underline;
}
</style>
