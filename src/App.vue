<template>
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  name: 'TrafficLight',
  mounted() {
    if (this.$route.name === 'Home') this.$router.replace('/red');
  }
}
</script>


<style lang="scss">
</style>
