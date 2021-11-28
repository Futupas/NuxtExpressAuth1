<template>

  <div>
    <div v-if="this.$auth.loggedIn">Your name: {{ this.$auth.user.fullName }}</div>
    
    <form method="post" @submit.prevent="login" v-if="!this.$auth.loggedIn">
      <input type="text" placeholder="Login" v-model="loginText" />
      <input type="password" placeholder="Password" v-model="password" />
      <button type="submit">Log In</button>
    </form>
    <button v-else @click="logout">Log out</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginText: '',
      password: '',
    }
  },

  methods: {
    login() {
      console.log(this.$auth);
      this.$auth.loginWith('local', {
        data: {
          login: this.loginText,
          password: this.password,
        }
      })
      .then(() => {
        this.$router.push('/');
      })
      .catch(console.error);
    },
    logout() {
      this.$auth.logout();
    }
  }
}
</script>
