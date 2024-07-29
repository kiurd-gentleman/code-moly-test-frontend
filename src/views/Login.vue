<template>
  <div>
    <h1>Login</h1>
    <div class="container">
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Email</label>
          <input v-model="email" type="email" placeholder="Email" class="form-control"/>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">Password</label>
          <input v-model="password" type="password" placeholder="Password" class="form-control"/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {email: this.email, password: this.password});
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }
};
</script>
