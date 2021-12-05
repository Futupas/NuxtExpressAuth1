<template>
  <div>
    Tin: {{ tin }}
  </div>
</template>

<script>
export default {
  async asyncData(app) {
    const response = await fetch('http://localhost:3000/api/tin');
    const realTin = await response.text();

    const tinToShow = realTin.substring(0, realTin.length-4) + '****';

    return {
      tin: tinToShow
    }
  }
}
</script>

<style>

</style>