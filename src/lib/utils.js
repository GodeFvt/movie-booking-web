import { Timestamp } from "firebase/firestore";

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

function getToday() {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // เวลาเริ่มต้นของวัน
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // เวลาสิ้นสุดของวัน

  const startDate = Timestamp.fromDate(startOfDay); 
  const endDate = Timestamp.fromDate(endOfDay);

  return { startDate, endDate };
}

export { formatDate, getToday };
