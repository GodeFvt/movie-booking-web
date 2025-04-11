<script setup>
defineProps({
  movie: {
    type: Object,
  },
});

function formatDate(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
</script>

<template>
  <a
    class="flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg focus:outline-none focus:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
    href="#"
  >
    <img
      class="rounded-t-xl object-cover w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80"
      :src="movie.thumbnail"
      alt="Card Image"
    />
    <div class="p-4 md:p-5">
      <h3 class="text-lg font-bold text-gray-800 dark:text-white">
        {{ movie.title }}
      </h3>
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
        {{ formatDate(movie.startDate) }} - {{ formatDate(movie.endDate) }}
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
        {{ movie.genres.join(", ") }}
      </p>
      <!-- <p class="mt-1 text-gray-500 dark:text-neutral-400 text-sm line-clamp-3">
        {{ movie.extract }}
      </p> -->
      <div class="flex w-full justify-end">
        <RouterLink :to="{ name: 'theater', params: { movieId: movie.id } }">
          <button
            class="mt-4 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-blue-500"
          >
            More Info
          </button>
        </RouterLink>
      </div>
    </div>
  </a>
</template>

<style scoped></style>
