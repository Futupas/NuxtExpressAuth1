<template>
  <div>
    Page for authorized people only!
    <button @click="fetchSecretData" >Fetch secret data</button>
  </div>
</template>

<script>
export default {
  middleware: 'auth_only',
  methods: {
    fetchSecretData() {
      this.$axios.get('/api/secret')
      .then(data => {
        console.log(data);
      })
      .catch(console.error);
    }
  }
}
</script>

<style>

</style>