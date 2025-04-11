<script setup>
import UserPopover from "@/components/UserPopover.vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore.js";
const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

defineProps({
  sidebarOpen: {
    type: Boolean,
  },
});
</script>

<template>
  <header
    class="flex transition-position flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 dark:bg-neutral-800"
  >
    <nav
      class="w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between"
    >
      <button
        v-if="sidebarOpen"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="hs-offcanvas-example"
        aria-label="Toggle navigation"
        data-hs-overlay="#hs-offcanvas-example"
        class="lg:hidden py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" class="inline-block">
          <path
            fill="currentColor"
            d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
          ></path>
        </svg>
      </button>

      <div class="sm:order-3 flex items-center gap-x-2">
        <UserPopover v-if="authStore.isAuthen" />
        <button
          v-else
          @click="router.push({ name: 'login' })"
          class="text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:bg-blue-600 p-2 px-5"
        >
          Login
        </button>
        <button
          type="button"
          class="sm:hidden hs-collapse-toggle relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
          id="hs-navbar-alignment-collapse"
          aria-expanded="false"
          aria-controls="hs-navbar-alignment"
          aria-label="Toggle navigation"
          data-hs-collapse="#hs-navbar-alignment"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="hs-collapse-open:hidden shrink-0 size-4"
          >
            <path
              fill="currentColor"
              d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"
            ></path>
          </svg>
          <svg
            class="hs-collapse-open:block hidden shrink-0 size-4"
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <span class="sr-only">Toggle</span>
        </button>
      </div>

      <div
        id="hs-navbar-alignment"
        class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2"
        aria-labelledby="hs-navbar-alignment-collapse"
      >
        <div
          class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5"
        >
          <RouterLink
            to="/"
            class="font-medium"
            :class="
              route.name === 'home'
                ? 'text-blue-500 focus:outline-none'
                : 'text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500'
            "
          >
            Home
          </RouterLink>
          <RouterLink
            v-if="authStore.isAuthen"
            to="/ticket"
            class="font-medium"
            :class="
              route.name === 'ticket'
                ? 'text-blue-500 focus:outline-none'
                : 'text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500'
            "
          >
            Tikets
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
