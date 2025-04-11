<script setup>
import MovieItem from "@/components/MovieItem.vue";

defineProps({
  movies: {
    type: Array,
  },
  isLoading: {
    type: Boolean,
  },
});
</script>

<template>
  <div
    v-if="!isLoading"
    class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 m-5"
  >
    <MovieItem v-for="item in movies" :key="item.id" :movie="item" />
  </div>
  <div v-else class="flex justify-center items-center h-96">
    <div
      class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2"
    ></div>
  </div>
</template>

<style scoped></style>
