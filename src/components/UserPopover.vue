<script setup>
import { useAuthStore } from "@/stores/AuthStore.js";
const authStore = useAuthStore();
</script>

<template>
  <!-- User -->
  <div class="hs-tooltip [--trigger:hover] sm:[--placement:right] inline-block">
    <div
      class="hs-tooltip-toggle max-w-xs p-2 flex items-center gap-x-3 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700"
    >
      <img
        class="inline-block size-7 rounded-full"
        src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
        alt="Avatar"
      />

      <!-- User Content -->
      <div class="grow">
        <h4 class="font-semibold text-sm text-gray-800 dark:text-white">
          {{ authStore.user.email }}
        </h4>
        <!-- <p
          class="text-sm text-gray-800 md:text-gray-500 dark:text-white md:dark:text-neutral-500"
        >
          amanda@email.com
        </p> -->
      </div>
      <!-- End User Content -->

      <!-- Popover Content -->
      <div
        class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible hidden opacity-0 transition-opacity absolute invisible z-10 max-w-xs w-full bg-white border border-gray-100 text-start rounded-xl shadow-md after:absolute after:top-0 after:-start-4 after:w-4 after:h-full dark:bg-neutral-800 dark:border-neutral-700"
        role="tooltip"
      >
        <!-- Header -->
        <div class="py-3 px-4 border-b border-gray-200 dark:border-neutral-700">
          <div class="flex items-center gap-x-3">
            <img
              class="shrink-0 inline-block size-10 rounded-full ring-2 ring-white dark:ring-neutral-900"
              src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
              alt="Avatar"
            />
            <div class="grow">
              <h4 class="font-semibold text-gray-800 dark:text-white">
                {{ authStore.user.email }}
              </h4>
              <p class="text-sm text-gray-500 dark:text-neutral-500">
                {{ authStore.user.email }}
              </p>
            </div>
          </div>
        </div>
        <!-- End Header -->

        <!-- List -->
        <ul class="py-3 px-4 space-y-1">
          <li>
            <div
              class="inline-flex items-center gap-x-3 text-sm text-gray-800 dark:text-neutral-200"
            >
              <svg
                class="shrink-0 size-4 text-gray-600 dark:text-neutral-400"
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
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                <path d="M10 6h4"></path>
                <path d="M10 10h4"></path>
                <path d="M10 14h4"></path>
                <path d="M10 18h4"></path>
              </svg>
              -
            </div>
          </li>

          <li>
            <div
              class="inline-flex items-center gap-x-3 text-sm text-gray-800 dark:text-neutral-200"
            >
              <svg
                class="shrink-0 size-4 text-gray-600 dark:text-neutral-400"
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
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                <path d="M12 18h.01"></path>
              </svg>
              -
            </div>
          </li>

          <li>
            <div
              class="inline-flex items-center gap-x-3 text-sm text-gray-800 dark:text-neutral-200"
            >
              <svg
                class="shrink-0 size-4 text-gray-600 dark:text-neutral-400"
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
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              {{ authStore.user.email }}
            </div>
          </li>
        </ul>
        <!-- End List -->

        <!-- End Footer -->
      </div>
      <!-- End Popover Content -->
    </div>
  </div>
  <!-- End User -->
</template>

<style scoped></style>
