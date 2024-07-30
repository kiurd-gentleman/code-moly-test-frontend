<template>
  <div class="container mx-auto">
    <div class="mt-5 w-50 mx-auto">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" type="email" placeholder="Email" id="email" class="form-control"/>
          <small v-if="errors.email" class="text-danger">{{ errors.email[0] }}</small>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" id="password" placeholder="Password" class="form-control"/>
          <small v-if="errors.password" class="text-danger">{{ errors.password[0] }}</small>
        </div>
        <button type="submit" class="btn btn-success">Login</button>
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
      password: '',
      errors: {}
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {email: this.email, password: this.password});
        this.$router.push('/dashboard');
      } catch (error) {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        }
        console.error('Login failed:', error);
      }
    }
  }
};
</script>
