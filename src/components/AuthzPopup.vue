<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import PopUp from "@/components/PopUp.vue";
import { useAuthStore } from "@/stores/AuthStore.js";
import { useRouter } from "vue-router";
const authStore = useAuthStore();

const showPopUp = ref(false);
const timeCount = ref(3);
const intervals = [];
const router = useRouter();

function notPass() {
  showPopUp.value = true;
}
onMounted(() => {
  notPass();
});

</script>
<template>
  <PopUp v-if="showPopUp">
    <template #message>
      <p class="text-lg text-gray-700">
        Please login for Booking
      </p>
    </template>
    <template #button>
      <router-link :to="{ name: 'login' }">
        <button
          class="mt-4 bg-gray-800 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        >
          Go to login
        </button>
      </router-link>
    </template>
  </PopUp>
</template>
<style scoped></style>
