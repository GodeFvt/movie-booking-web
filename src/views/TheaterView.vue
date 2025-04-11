<script setup>
import Layout from "@/components/Layout.vue";
import TheatersList from "@/components/TheatersList.vue";
import AuthzPopup from "@/components/AuthzPopup.vue";
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  collection,
  getDoc,
  query,
  where,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/init.js";

const router = useRouter();
const route = useRoute();

const movieData = ref({});
const theaters = ref([]);
const isLoading = ref(false);

const getMovie = async () => {
  
  isLoading.value = true;
  const prodRef = doc(db, "movies", route.params.movieId);
  const docSnap = await getDoc(prodRef);
  movieData.value = { id: docSnap.id, ...docSnap.data() };

  const q = query(
    collection(db, "theaters"),
    where("movieTitle", "array-contains", movieData.value.title)
  );

  onSnapshot(q, (snapshot) => {
    theaters.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    isLoading.value = false;
  });
};

onMounted(() => {
  getMovie();
});

watch(() => route.params.movieId, getMovie);
</script>

<template>
  <Layout :style="'bg-neutral-900 '" :sidebarOpen="false">
    <template #content>
      <TheatersList
        :movie="movieData"
        :theaters="theaters"
        :isLoading="isLoading"
      />
    </template>
  </Layout>
</template>

<style scoped></style>
