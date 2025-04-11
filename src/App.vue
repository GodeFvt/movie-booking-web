<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useMovieStore } from "./stores/movieStore.js";

import { onMounted } from "vue";

const movieStore = useMovieStore();

onMounted(() => {
  movieStore.getMovies();
  movieStore.getCountMovieCurrentDate();
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
