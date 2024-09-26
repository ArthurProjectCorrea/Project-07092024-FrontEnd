<template>
  <div class="styleApp">
    <NavBar v-if="!hideNavBar" />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView, useRoute } from "vue-router";
import NavBar from "./components/layouts/NavBar.vue";
import { computed } from 'vue';

// Obtenha a rota atual
const route = useRoute();

// Esconda a NavBar se a rota for signin ou signup
const hideNavBar = computed(() => {
  return route.path === '/signin' || route.path === '/signup' || route.path === '/forgotpassword';
});
</script>

<style scoped>
.styleApp {
  @apply bg-white w-full h-full dark:bg-gray-900 text-gray-950
}
</style>
