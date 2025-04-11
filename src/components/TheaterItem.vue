<script setup>
import ShowtimeList from "./ShowtimeList.vue";
import { ref } from "vue";
defineProps({
  theater: {
    type: Object,
  },
  movie: {
    type: Object,
  },
  selectedDate: {
    type: Object,
  },
});

const isOpen = ref(true);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div>
    <button
      @click="toggle"
      class="w-full py-3 px-4 text-left flex justify-between items-center text-gray-300 hover:bg-gray-700"
      :class="isOpen ? '' : 'border-b border-gray-700'"
    >
      <span class="font-medium">{{ theater.theaterName }}</span>
      <span
        class="transform transition-transform"
        :class="{ 'rotate-180': isOpen }"
        ><svg
          class="ms-auto size-6"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </span>
    </button>

    <!-- Collapsible Content -->
    <div
      v-if="isOpen"
      class="p-4 text-gray-300 hover:bg-gray-700"
      :class="isOpen ? 'border-b border-gray-700' : ''"
    >
      <ShowtimeList
        v-if="theater.movies.length > 0"
        :shows="theater.movies"
        :theaterId="theater.id"
        :movie="movie"
        :selectedDate="selectedDate"
      />
      <p v-else>Content for {{ theater.theaterName }} will go here...</p>
    </div>
  </div>
</template>

<style scoped></style>
