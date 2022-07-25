<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Menu from './components/Menu.vue';
//import Table from './components/Table.vue'

</script>

<template>
  <Menu></Menu>
  <router-view></router-view>
</template>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
}
.full-container{
  background: #ccc;
  height: 100%;
}
</style>

<style scoped>
.header{
  background: #ffffff;
}
.main {
  background: blue;
}
</style>