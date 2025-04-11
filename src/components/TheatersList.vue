<script setup>
import TheaterItem from "@/components/TheaterItem.vue";
import MovieDetail from "@/components/MovieDetail.vue";
import { computed, watch, ref } from "vue";
import { formatDate } from "../lib/utils.js";
import { Timestamp } from "firebase/firestore";

const props = defineProps({
  theaters: {
    type: Array,
  },
  movie: {
    type: Object,
  },
  isLoading: {
    type: Boolean,
  },
});

const generateDateList = (startDate, endDate) => {
  const dates = [];
  let currentDate = startDate.toDate();
  const lastDate = endDate.toDate();
  const today = new Date();

  while (currentDate <= lastDate) {
    if (currentDate >= today) {
      dates.push(Timestamp.fromDate(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  selectedDate.value = dates[0];
  return dates;
};

const dateList = ref([]);
const selectedDate = ref(null);
watch(
  () => props.movie,
  (newVal) => {
    console.log(newVal);
    if (newVal && newVal.startDate && newVal.endDate) {
      dateList.value = generateDateList(newVal.startDate, newVal.endDate);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div v-if="!isLoading" class="">
    <MovieDetail :movie="movie" />
    <div>
      <h2 class="text-2xl font-semibold text-gray-300 m-4">Buy Tickets</h2>
      <h2 class="text-xl font-semibold text-gray-300 m-4">
        Select Date : {{ selectedDate ? formatDate(selectedDate) : "" }}
      </h2>

      <!-- Render Date List -->
      <div class="m-4 flex gap-2 overflow-auto">
        <button
          v-for="date in dateList"
          :key="date"
          @click="selectedDate = date"
          class="p-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700"
        >
          {{ formatDate(date) }}
        </button>
      </div>
      <h2 class="text-xl font-semibold text-gray-300 m-4">Select Theaters</h2>

      <div class="m-4">
        <TheaterItem
          v-for="theater in theaters"
          :key="theater.id"
          :theater="theater"
          :movie="movie"
          :selectedDate="selectedDate"
        />
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center items-center h-96">
    <div
      class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2"
    ></div>
  </div>
</template>

<style scoped></style>
