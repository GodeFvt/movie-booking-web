<script setup>
import { onMounted } from "vue";
import Layout from "@/components/Layout.vue";
import MoviesList from "@/components/MoviesList.vue";
import { useMovieStore } from "../stores/movieStore.js";

// const getMovies = async () => {
//   isLoading.value = true;
//   const q = query(collection(db, "movies"));
//   const unsub = onSnapshot(q, (querySnapshot) => {
//     moviesData.value = [];
//     querySnapshot.forEach((doc) => {
//       moviesData.value.push({ id: doc.id, ...doc.data() });
//     });
//     extractGenres();
//     isLoading.value = false;
//   });
// };

// const extractGenres = () => {
//   const genresSet = new Set();
//   moviesData.value.forEach((movie) => {
//     if (movie.genres) {
//       movie.genres.forEach((genre) => genresSet.add(genre));
//     }
//   });
//   genres.value = Array.from(genresSet);
// };
const movieStore = useMovieStore();

onMounted(async () => {
  movieStore.getMovies();
  // getMovies();
});
</script>

<template>
  <Layout :style="'bg-neutral-900'" :genres="movieStore.genres">
    <template #content>
      <div class="ml-5 mt-2">
        <h1 class="text-3xl font-bold text-neutral-100">Movies</h1>
        <div class="flex gap-1 mt-1">
          <p
            class="text-neutral-300 border border-neutral-300 px-2 rounded-md bg-neutral-800"
          >
            {{ movieStore.countMovieCurrentDate }}
          </p>
          <p class="text-neutral-300">movies are available today</p>
        </div>
      </div>
      <MoviesList
        :movies="movieStore.movies"
        :isLoading="movieStore.movies.length <= 0"
      />
    </template>
  </Layout>
</template>

<style scoped></style>
