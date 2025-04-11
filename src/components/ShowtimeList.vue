<script setup>
defineProps({
  movie: {
    type: Object,
  },
  shows: {
    type: Array,
  },
  theaterId: {
    type: String,
  },
  selectedDate: {
    type: Object,
  },
});
</script>

<template>
  <div class="" v-for="(show, idx) in shows" :key="idx">
    <!-- Cinema Hall Title -->
    <div
      class="flex items-center justify-between mb-2"
      v-if="show.movieTitle == movie.title"
    >
      <div class="text-xl font-semibold">{{ show.hall }}</div>
      <div class="text-sm text-gray-400">{{ show.language }}</div>
    </div>

    <!-- Showtimes -->
    <div class="grid grid-cols-4 gap-3" v-if="show.movieTitle == movie.title">
      <RouterLink
        class="py-2 px-4 bg-yellow-600 hover:bg-yellow-700 rounded-md text-black font-medium flex items-center justify-center"
        v-for="(time, idx) in show.time"
        :key="idx"
        :to="{
          name: 'booking',
          params: { theaterId: theaterId },
          query: {
            time: time,
            hall: show.hall,
            movie: show.movieTitle,
            date: selectedDate?.toDate(),
          },
        }"
      >
        <button class="">
          {{ time }}
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
