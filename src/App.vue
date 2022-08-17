<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import baidu from './components/baidumap.vue'
import login from '@/pages/login'
export default {
  name: 'App',
  components:{login}
}
</script>

<style >
</style>
