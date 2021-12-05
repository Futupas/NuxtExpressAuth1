<template>
  <div>
      info: {{ info }}
  </div>
</template>

<script>
export default {
  asyncData (app) {
    return {
      info: app.params.data
    }
  }
}
</script>

<style>

</style>