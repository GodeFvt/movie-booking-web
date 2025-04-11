<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import Layout from "@/components/Layout.vue";
import MoviesList from "@/components/MoviesList.vue";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
  or,
  and,
  limit,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase/init.js";
import { useMovieStore } from "../stores/movieStore.js";
const router = useRouter();
const route = useRoute();
const movieStore = useMovieStore();
const moviesData = ref([]);
const isLoading = ref(false);

async function getFilter() {
  try {
    moviesData.value = [];
    isLoading.value = true;
    let qry = null;
    let movieRef = null;

    movieRef = collection(db, "movies");

    let filters = [];
    
    if (route.query.genres) {
      const genres = route.query.genres.split(",");
      filters.push(where("genres", "array-contains-any", genres));
    }

    if (route.query.start && route.query.end) {
      const startDate = Timestamp.fromDate(new Date(route.query.start));
      const endDate = Timestamp.fromDate(new Date(route.query.end));
      filters.push(
        where("startDate", "<=", endDate),
        where("endDate", ">=", startDate)
      );
    }

    if (route.query.sort) {
      if (route.query.sort === "asc") {
        if (route.query.orderBy === "title") {
          filters.push(orderBy("title", "asc"));
        } else {
          filters.push(orderBy("endDate", "asc"));
        }
      } else {
        if (route.query.orderBy === "title") {
          filters.push(orderBy("title", "desc"));
        } else {
          filters.push(orderBy("endDate", "desc"));
        }
      }
    }

    if (route.query.limit) {
      if (parseInt(route.query.limit)) {
        filters.push(limit(parseInt(route.query.limit)));
      }
    }

    qry = query(movieRef, ...filters);

    if (qry) {
      onSnapshot(qry, (querySnapshot) => {
        moviesData.value = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          data.id = doc.id;
          if (route.query.movie) {
            if (
              data.title.toLowerCase().includes(route.query.movie.toLowerCase())
            ) {
              moviesData.value.push(data);
            }
          } else {
            moviesData.value.push(data);
          }
        });
        isLoading.value = false;
      });
    }
  } catch (error) {
    router.push({ name: "home" });
  }
}

onMounted(() => {
  getFilter();
});

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    getFilter();
  }
);
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
      <MoviesList :movies="moviesData" :isLoading="isLoading" />
    </template>
  </Layout>
</template>

<style scoped></style>
