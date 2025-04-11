<script setup>
import Layout from "@/components/Layout.vue";
import TicketList from "@/components/TicketList.vue";
import AuthzPopup from "@/components/AuthzPopup.vue";
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  collection,
  getDoc,
  query,
  where,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/init.js";
import { useAuthStore } from "@/stores/AuthStore.js";
const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();

const ticketData = ref({});
const isLoading = ref(false);
const showPopUp = ref(false);

const getTickets = async () => {
  if (!authStore.isAuthen) {
    showPopUp.value = true;
    return;
  }

  isLoading.value = true;

  const q = query(
    collection(db, "bookings"),
    where("userId", "==", authStore.user.uid)
  );

  onSnapshot(q, (snapshot) => {
    ticketData.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    isLoading.value = false;
  });
};

onMounted(() => {
  getTickets();
});
</script>

<template>
  <Layout :style="'bg-neutral-900 '" :sidebarOpen="false">
    <template #content>
      <TicketList :tickets="ticketData" :isLoading="isLoading" />
      <AuthzPopup v-if="showPopUp" />
    </template>
  </Layout>
</template>

<style scoped></style>
