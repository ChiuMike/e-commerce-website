<template>
  <div id="app">
    <router-view :stared="star"></router-view>
  </div>
</template>

<script>
import Home from './components/Home'

export default {
  name: 'App',
  data(){
    return {
      star:[],
    }
  }
}
</script>

<style lang="scss">
@import "./assets/all";
</style>
