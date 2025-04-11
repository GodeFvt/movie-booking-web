<script setup>
defineProps({
  genres: {
    type: Array,
    default: () => [],
  },
});

import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const genreFilter = ref([]);
const movieSearch = ref("");
const startDate = ref("");
const endDate = ref("");
const orderBy = ref("title");
const sort = ref("asc");
const limit = ref("All");
const today = ref(false);

const search = () => {
  const query = {};
  if (genreFilter.value?.length) {
    query.genres = genreFilter.value.join(",");
  }

  if (movieSearch.value) {
    query.movie = movieSearch.value;
  }

  if (startDate.value) {
    query.start = startDate.value;
  }

  if (endDate.value) {
    query.end = endDate.value;
  }

  if (orderBy.value) {
    query.orderBy = orderBy.value;
  }

  if (sort.value) {
    query.sort = sort.value;
  }

  if (limit.value) {
    query.limit = limit.value;
  }

  router.push({
    name: "filter",
    query,
  });

  genreFilter.value = [];
  movieSearch.value = "";
  startDate.value = "";
  endDate.value = "";
};

const setToday = () => {
  today.value = !today.value;
  if (today.value) {
    startDate.value = new Date().toISOString().split("T")[0];
    endDate.value = new Date().toISOString().split("T")[0];
  } else {
    startDate.value = "";
    endDate.value = "";
  }
};
</script>

<template>
  <!-- Sidebar -->
  <div
    id="hs-offcanvas-example"
    class="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800 dark:border-neutral-700"
    role="dialog"
    tabindex="-1"
    aria-label="Sidebar"
  >
    <div class="px-6">
      <a
        class="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
        href="#"
        aria-label="Brand"
        >Filter</a
      >
    </div>
    <nav
      class="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
      data-hs-accordion-always-open
    >
      <ul class="space-y-1.5">
        <!-- <div class="text-gray-700 dark:text-white pb-2">Top Search</div>
        <li>
          <a
            class="flex items-center gap-x-3.5 py-2 px-2.5 border text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
            href="#"
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-x-3.5 py-2 px-2.5 border text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
            href="#"
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-x-3.5 py-2 px-2.5 border-[0.5px] text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
            href="#"
          >
            Dashboard
          </a>
        </li>
        <div class="border-b border-gray-100 border-0 pt-2"></div> -->
        <li class="hs-search">
          <input
            class="py-3 ps-2 pe-4 block mt-3 w-full h-[2.2rem] border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            type="text"
            role="combobox"
            aria-expanded="false"
            placeholder="Movie name"
            value=""
            data-hs-combo-box-input=""
            v-model="movieSearch"
          />
        </li>

        <li>
          <div class="ml-3 flex flex-col gap-1 pt-1">
            <div
              class="text-gray-500 dark:text-neutral-400 text-sm flex justify-between items-center"
            >
              Order By
              <select
                v-model="sort"
                class="p-1 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              >
                <option selected="asc" value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div class="flex gap-x-6">
              <div class="flex">
                <input
                  type="radio"
                  name="hs-radio-group"
                  class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  id="hs-radio-group-1"
                  checked=""
                  v-model="orderBy"
                  value="title"
                />
                <label
                  for="hs-radio-group-1"
                  class="text-sm text-gray-500 ms-2 dark:text-neutral-400"
                  >Title</label
                >
              </div>

              <div class="flex">
                <input
                  type="radio"
                  name="hs-radio-group"
                  class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  id="hs-radio-group-2"
                  v-model="orderBy"
                  value="endDate"
                />
                <label
                  for="hs-radio-group-2"
                  class="text-sm text-gray-500 ms-2 dark:text-neutral-400"
                  >End Date</label
                >
              </div>
            </div>
            <div
              class="text-gray-500 dark:text-neutral-400 text-sm flex justify-between items-center"
            >
              Limit
              <select
                v-model="limit"
                class="p-1 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              >
                <option selected="All" value="All">All</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div>
          </div>
        </li>

        <li class="hs-accordion" id="account-accordion">
          <button
            type="button"
            class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
            aria-expanded="true"
            aria-controls="account-accordion"
          >
            <svg
              class="size-4"
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
              <circle cx="18" cy="15" r="3" />
              <circle cx="9" cy="7" r="4" />
              <path d="M10 15H6a4 4 0 0 0-4 4v2" />
              <path d="m21.7 16.4-.9-.3" />
              <path d="m15.2 13.9-.9-.3" />
              <path d="m16.6 18.7.3-.9" />
              <path d="m19.1 12.2.3-.9" />
              <path d="m19.6 18.7-.4-1" />
              <path d="m16.8 12.3-.4-1" />
              <path d="m14.3 16.6 1-.4" />
              <path d="m20.7 13.8 1-.4" />
            </svg>
            Genres
            <svg
              class="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
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

            <svg
              class="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
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
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <div
            id="account-accordion"
            class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
            role="region"
            aria-labelledby="account-accordion"
          >
            <ul class="pt-2 ps-2">
              <li v-for="(genre, i) in genres" :key="i">
                <label
                  :for="`hs-checkbox-in-form-${i}`"
                  class="flex p-3 w-full text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                >
                  <input
                    type="checkbox"
                    class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    :id="`hs-checkbox-in-form-${i}`"
                    :value="genre"
                    v-model="genreFilter"
                  />
                  <span
                    class="text-sm text-gray-500 ms-3 dark:text-neutral-400"
                    >{{ genre }}</span
                  >
                </label>
              </li>
              <!-- <li>
                <a
                  class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                  href="#"
                >
                  Link 2
                </a>
              </li>
              <li>
                <a
                  class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                  href="#"
                >
                  Link 3
                </a>
              </li> -->
            </ul>
          </div>
        </li>

        <li>
          <label
            for="today"
            class="flex w-full hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-start items-center py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
          >
            <input
              type="checkbox"
              class="shrink-0 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
              id="today"
              @click="setToday"
              v-model="today"
            />
            <span class="text-sm text-gray-500 ms-3 dark:text-neutral-400">
              Show only active
            </span>
          </label>
        </li>

        <li class="hs-accordion" id="projects-accordion">
          <button
            type="button"
            class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
            aria-expanded="true"
            aria-controls="projects-accordion"
          >
            <svg
              class="size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M14.55 16.55L11 13V8h2v4.175l2.95 2.95zM11 6V4h2v2zm7 7v-2h2v2zm-7 7v-2h2v2zm-7-7v-2h2v2zm8 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
              />
            </svg>
            Date Range
            <svg
              class="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
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

            <svg
              class="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
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
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <div
            id="projects-accordion"
            class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
            role="region"
            aria-labelledby="projects-accordion"
          >
            <ul class="pt-2 ps-2">
              <li class="flex flex-col gap-1">
                <label
                  for="start"
                  class="text-sm text-gray-500 dark:text-neutral-400 pl-1"
                >
                  Select Start Date
                </label>

                <input
                  type="date"
                  id="start"
                  v-model="startDate"
                  class="gap-x-3.5 py-2 px-2.5 w-full text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                />
              </li>
              <li>
                <label
                  for="end"
                  class="text-sm text-gray-500 dark:text-neutral-400 pl-1"
                >
                  Select End Date
                </label>

                <input
                  type="date"
                  id="end"
                  v-model="endDate"
                  class="gap-x-3.5 py-2 px-2.5 w-full text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                />
              </li>
            </ul>
          </div>
        </li>

        <!-- <li>
          <a
            class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
            href="#"
          >
            <svg
              class="size-4"
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
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
              <path d="M8 14h.01" />
              <path d="M12 14h.01" />
              <path d="M16 14h.01" />
              <path d="M8 18h.01" />
              <path d="M12 18h.01" />
              <path d="M16 18h.01" />
            </svg>
            Calendar
          </a>
        </li> -->

        <li class="pt-3">
          <div
            class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            @click="search"
          >
            <svg
              class="shrink-0 text-gray-400 dark:text-white/60"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>

            Search
          </div>
        </li>
      </ul>
    </nav>
  </div>
  <!-- End Sidebar -->
</template>

<style scoped></style>
