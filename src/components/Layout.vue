<script setup>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";

defineProps({
  style: {
    type: String,
  },
  sidebarOpen: {
    type: Boolean,
    default: true,
  },
  genres: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div
    class="flex flex-col h-screen w-full"
    :class="sidebarOpen ? 'lg:pl-[16rem]' : ''"
  >
    <Navbar class="sticky" :sidebarOpen="sidebarOpen" />
    <div class="w-full h-full overflow-y-auto" :class="style">
      <slot name="content"></slot>
    </div>
  </div>
  <Sidebar v-if="sidebarOpen" :genres="genres" />
</template>

<style scoped></style>
