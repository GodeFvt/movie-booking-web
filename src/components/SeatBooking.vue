<script setup>
import { ref, computed, watch } from "vue";
import { formatDate } from "../lib/utils.js";
import { useRouter, useRoute } from "vue-router";
import { collection, addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { auth, db } from "../firebase/init.js";
import AuthzPopup from "@/components/AuthzPopup.vue";
import { useAuthStore } from "@/stores/AuthStore.js";
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const props = defineProps({
  theater: {
    type: Object,
  },
  hall: {
    type: Array,
  },
  bookedSeats: {
    type: Array,
  },
  movie: {
    type: Array,
  },
  time: {
    type: String,
  },
  date: {
    type: String,
  },
  isLoading: {
    type: Boolean,
  },
});

watch(
  () => props.hall,
  (newVal) => {
    if (newVal.length > 0) {
      seatingPlan.value = newVal[0].seatingPlan;
      seatPrice.value = newVal[0].seatPrice;
    }
  },
  { immediate: true }
);

watch(
  () => props.bookedSeats,
  (newVal) => {
    if (newVal.length > 0) {
      let totalSeats = [];
      newVal.forEach((book) => {
        totalSeats = book.bookedSeats.concat(totalSeats);
      });
      bookings.value = totalSeats;
    }
  },
  { immediate: true }
);

const seatingPlan = ref({
  rows: 10,
  seatsPerRow: 10,
});
const bookings = ref([]);
const seatPrice = ref(100);
const selectedSeats = ref([]);

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function getSeatLabel(row, seat) {
  return `${alphabet[row]}${seat + 1}`;
}

function isOccupied(row, seat) {
  const seatLabel = getSeatLabel(row, seat);
  return bookings.value.includes(seatLabel);
}

function isSelected(seatLabel) {
  return selectedSeats.value.includes(seatLabel);
}

function toggleSeat(row, seat) {
  const seatLabel = getSeatLabel(row, seat);

  if (isOccupied(row, seat)) return;

  const seatIndex = selectedSeats.value.indexOf(seatLabel);

  if (seatIndex > -1) {
    selectedSeats.value.splice(seatIndex, 1);
  } else {
    selectedSeats.value.push(seatLabel);
  }
}

function resetSelection() {
  selectedSeats.value = [];
}

const total = computed(() => selectedSeats.value.length * seatPrice.value);

const showPopUp = ref(false);
// Book ticket
async function bookTicket() {
  if (!authStore.isAuthen) {
    showPopUp.value = true;
    return;
  }
  if (selectedSeats.value.length === 0) return;

  // แปลง props.date และ props.time เป็น Date object
  const date = new Date(props.date); // แปลง props.date เป็น Date object
  const [hours, minutes, seconds] = props.time.split(":").map(Number); // แยกเวลา
  // ตั้งค่าเวลาในวันที่
  date.setHours(hours, minutes, seconds, 0);
  // ปรับเวลาจาก GMT+7 เป็น UTC (ลบ 7 ชั่วโมง)
  const utcDate = new Date(date.getTime() - 7 * 60 * 60 * 1000);
  // แปลงเป็น Firestore Timestamp
  const newdate = Timestamp.fromDate(utcDate);

  const booking = {
    movieTitle: props.movie[0].title,
    theaterName: props.theater.theaterName,
    hall: props.hall[0].hallName,
    showtime: newdate,
    bookedSeats: selectedSeats.value,
    status: false,
    totalPrice: total.value,
    timestamp: Timestamp.now(),
    userId: authStore.user.uid,
  };

  try {
    await addDoc(collection(db, "bookings"), booking);
  } catch (e) {
    console.error("Error adding document: ", e);
  } finally {
    router.push({ name: "home" });
  }
}
</script>

<template>
  <AuthzPopup v-if="showPopUp" />
  <div v-if="isLoading" class="flex justify-center items-center h-96">
    <div
      class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2"
    ></div>
  </div>
  <div v-else class="flex w-full h-full flex-col gap-4">
    <div
      class="bg-white border rounded-xl shadow-sm sm:flex dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
    >
      <div
        class="h-72 shrink-0 flex justify-center items-center my-2 w-full rounded-t-xl overflow-hidden sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs"
      >
        <img class="h-full object-cover" :src="movie[0]?.thumbnail" />
      </div>
      <div class="flex flex-wrap">
        <div class="p-4 flex flex-col h-full sm:p-7">
          <h3 class="text-xl font-bold text-gray-800 dark:text-white">
            {{ movie[0]?.title }}
          </h3>
          <p class="mt-1 text-gray-500 dark:text-neutral-400 line-clamp-3">
            Date : {{ formatDate(Timestamp.fromDate(new Date(date))) }}
          </p>
          <p class="mt-1 text-gray-500 dark:text-neutral-400 line-clamp-3">
            Time : {{ time }}
          </p>
          <p class="mt-1 text-gray-500 dark:text-neutral-400 line-clamp-3">
            Theater : {{ theater.theaterName }}
          </p>
          <p class="mt-1 text-gray-500 dark:text-neutral-400 line-clamp-3">
            Hall : {{ hall[0]?.hallName }}
          </p>
          <p class="mt-1 text-gray-500 dark:text-neutral-400 line-clamp-3">
            Seat Price : {{ seatPrice }}
          </p>
          <p class="mt-1 text-gray-500 dark:text-neutral-400 line-clamp-3">
            Select Total : {{ total }}
          </p>
          <p class="mt-1 text-gray-500 dark:text-neutral-400 line-clamp-3">
            Select Seats : {{ selectedSeats?.join(", ") }}
            <button
              @click="resetSelection"
              v-if="selectedSeats.length > 0"
              class="p-1 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700"
            >
              Reset
            </button>
          </p>

          <button
            class="mt-2 p-2 text-center rounded-lg"
            @click="bookTicket"
            :class="
              selectedSeats.length === 0
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-gray-800 text-gray-200  hover:bg-gray-700'
            "
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
    <div class="movie-container">
      <div class="container">
        <div class="screen"></div>
        <div
          v-for="(row, rowIndex) in seatingPlan.rows"
          :key="rowIndex"
          class="row"
        >
          <div
            v-for="(seat, seatIndex) in seatingPlan.seatsPerRow"
            :key="seatIndex"
            :class="[
              'seat',
              {
                occupied: isOccupied(rowIndex, seatIndex),
                selected: isSelected(getSeatLabel(rowIndex, seatIndex)),
              },
            ]"
            @click="toggleSeat(rowIndex, seatIndex)"
          ></div>
        </div>
        <ul class="showcase">
          <li>
            <div class="seat"></div>
            <small>N/A</small>
          </li>
          <li>
            <div class="seat selected"></div>
            <small>Selected</small>
          </li>
          <li>
            <div class="seat occupied"></div>
            <small>Occupied</small>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-container {
  margin-top: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 50px;
}

.movie-container select {
  appearance: none;
  border: 0;
  padding: 5px 15px;
  margin-bottom: 40px;
  font-size: 14px;
  border-radius: 5px;
}

.container {
  perspective: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.seat {
  background-color: #444451;
  height: 45px;
  width: 50px;
  margin: 3px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.selected {
  background-color: #0081cb;
}

.occupied {
  background-color: #fff;
}

.seat:not(.occupied):hover {
  cursor: pointer;
  transform: scale(1.2);
}

.row {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
}

.screen {
  background: #fff;
  height: 70px;
  width: 70%;
  margin: 15px 0;
  transform: rotateX(-45deg);
  box-shadow: 0 3px 10px rgba(255, 255, 255, 0.7);
}

.showcase .seat:not(.occupied):hover {
  cursor: default;
  transform: scale(1);
}

.showcase {
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  background: rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  border-radius: 5px;
  color: #777;
}

.showcase li {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
}

.showcase li small {
  margin-left: 2px;
}

/* Tablet (medium screen) */
@media (max-width: 1024px) {
  .seat {
    height: 30px;
    width: 35px;
    margin: 2px;
  }

  .row {
    width: 80%;
  }

  .screen {
    width: 80%;
  }
}

/* Mobile (small screen) */
@media (max-width: 768px) {
  .seat {
    height: 15px;
    width: 20px;
    margin: 2px;
  }

  .row {
    width: 80%; /* Full-width for mobile */
  }
}
</style>
