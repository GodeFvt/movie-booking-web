<script setup>
import Layout from "@/components/Layout.vue";
import SeatBooking from "@/components/SeatBooking.vue";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getDoc,
  doc,
  query,
  collection,
  onSnapshot,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebase/init.js";

const route = useRoute();
const router = useRouter();

const theaterData = ref({});
const hallData = ref([]);
const movieData = ref([]);
const bookedSeats = ref([]);
const isLoading = ref(false);

const getTheater = async () => {
  isLoading.value = true;
  const theaterRef = doc(db, "theaters", route.params.theaterId);
  const docSnap = await getDoc(theaterRef);
  theaterData.value = { id: docSnap.id, ...docSnap.data() };

  if (route.query.time && route.query.movie) {
    const movie = theaterData.value.movies.find(
      (movie) =>
        movie.movieTitle === route.query.movie &&
        movie.time.toString().includes(route.query.time)
    );
    if (!movie) {
      router.push({ name: "home" });
    }
  } else {
    router.push({ name: "home" });
  }

  await getHalls();
  await getBooking();
  await getMovie();
  isLoading.value = false;
};

const getHalls = async () => {
  const q = query(
    collection(db, "halls"),
    where("hallName", "==", route.query.hall),
    where("theaterName", "==", theaterData.value.theaterName)
  );
  const querySnapshot = await getDocs(q);
  hallData.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const getBooking = async () => {
  const q = query(
    collection(db, "bookings"),
    where("hall", "==", route.query.hall),
    where("movieTitle", "==", route.query.movie),
    where("theaterName", "==", theaterData.value.theaterName)
  );

  const querySnapshot = await getDocs(q);
  bookedSeats.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const getMovie = async () => {
  const q = query(
    collection(db, "movies"),
    where("title", "==", route.query.movie)
  );

  const querySnapshot = await getDocs(q);
  movieData.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

onMounted(() => {
  getTheater();
});

watch(() => route.params.theaterId, getTheater);
</script>

<template>
  <Layout :style="'bg-neutral-900 '" :sidebarOpen="false">
    <template #content>
      <SeatBooking
        :theater="theaterData"
        :time="route.query.time"
        :date="route.query.date"
        :movie="movieData"
        :hall="hallData"
        :bookedSeats="bookedSeats"
        :isLoading="isLoading"
      />
    </template>
  </Layout>
</template>

<style scoped></style>
