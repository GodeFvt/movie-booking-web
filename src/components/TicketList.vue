<script setup>
import { computed, watch, ref } from "vue";
import { formatDate } from "../lib/utils.js";
import { Timestamp } from "firebase/firestore";

const props = defineProps({
  tickets: {
    type: Array,
  },
  isLoading: {
    type: Boolean,
  },
});
</script>

<template>
  <div v-if="!isLoading" class="">
    <div class="flex flex-col gap-4 ml-5 mt-5">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <h1 class="text-3xl font-bold text-neutral-100">Your Tickets</h1>
          <p class="text-neutral-300">
            Here are your tickets for the upcoming movies
          </p>
          <div class="flex flex-col">
            <div class="-m-1.5 overflow-x-auto">
              <div class="p-1.5 min-w-full inline-block align-middle">
                <div class="overflow-hidden">
                  <table
                    class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700"
                  >
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          Movie
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          theaterName
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          hall
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          showtime
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          Ticket USE
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      class="divide-y divide-gray-200 dark:divide-neutral-700"
                    >
                      <tr v-for="ticket in tickets" :key="ticket.id">
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200"
                        >
                          {{ ticket.movieTitle }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200"
                        >
                          {{ ticket.theaterName }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200"
                        >
                          {{ ticket.hall }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200"
                        >
                          {{ ticket.showtime.toDate() }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200"
                        >
                          {{ ticket.isUsed ? "Used" : "Not Used" }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
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
