<script setup>
import { formatDate } from "../lib/utils.js";
defineProps({
  movie: {
    type: Object,
  },
});
</script>

<template>
  <div
    class="bg-white border rounded-xl shadow-sm sm:flex dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
  >
    <div
      class="h-72 shrink-0 flex justify-center items-center my-2 w-full rounded-t-xl overflow-hidden sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs"
    >
      <img class="h-full object-cover" :src="movie?.thumbnail" />
    </div>
    <div class="flex flex-wrap">
      <div class="p-4 flex flex-col h-full sm:p-7">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white">
          {{ movie?.title }}
        </h3>
        <p class="mt-1 text-gray-500 dark:text-neutral-400 line-clamp-3">
          {{ movie?.extract }}
        </p>
        <div class="mt-5 sm:mt-auto">
          <p
            class="mt-1 text-blue-500 dark:text-blue-400 text-sm line-clamp-3 flex items-center"
          >
            <svg
              class="size-5 inline-block mr-1.5 -mt-0.5"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M14.55 16.55L11 13V8h2v4.175l2.95 2.95zM11 6V4h2v2zm7 7v-2h2v2zm-7 7v-2h2v2zm-7-7v-2h2v2zm8 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
              />
            </svg>
            {{ formatDate(movie?.startDate) }} -
            {{ formatDate(movie?.endDate) }}
          </p>
          <p
            class="mt-1 text-gray-500 dark:text-neutral-400 text-sm line-clamp-3 flex items-center"
          >
            <svg
              class="size-5 inline-block mr-1.5 -mt-0.5"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h11q.475 0 .9.213t.7.587L22 12l-5.4 7.2q-.275.375-.7.588T15 20zm0-2h11l4.5-6L15 6H4zm5.5-6"
              />
            </svg>
            {{ movie?.genres?.join(", ") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
