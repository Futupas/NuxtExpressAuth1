<template>
  <div>
      info: {{ info }}
  </div>
</template>

<script>
export default {
    data() {
        return {
            info: this.$route.params.data
        }
    }
}
</script>

<style>

</style>