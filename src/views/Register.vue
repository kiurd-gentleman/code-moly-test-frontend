<template>
  <div class="container mx-auto">
    <div class="mt-5 w-50 mx-auto">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" v-model="name" id="name" class="form-control" placeholder="Name"/>
          <small v-if="errors.name" class="text-danger">{{ errors.name[0] }}</small>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" id="email" class="form-control" type="email" placeholder="Email"/>
          <small v-if="errors.email" class="text-danger">{{ errors.email[0] }}</small>

        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" id="password" class="form-control" type="password" placeholder="Password"/>
          <small v-if="errors.password" class="text-danger">{{ errors.password[0] }}</small>

        </div>
        <div class="mb-3">
          <label for="password_confirmation" class="form-label">Confirm Password</label>
          <input v-model="password_confirmation" class="form-control" id="password_confirmation" type="password" placeholder="Confirm Password"/>
          <small v-if="errors.password" class="text-danger">{{ errors.password[0] }}</small>
        </div>
        <button type="submit" class="btn btn-success">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: {}
    };
  },
  methods: {
    async register() {
      try {
        await this.$store.dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        });
        this.$router.push('/dashboard');
      } catch (error) {
        //validation error show
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        }
        console.error('Registration failed:', error);
      }
    }
  }
};
</script>
