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
  },
  created(){
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = myCookie;
  }
}
</script>

<style lang="scss">
@import "./assets/all";
</style>
