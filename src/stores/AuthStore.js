import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { defineStore } from "pinia";
import { auth, db } from "../firebase/init.js";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null,
    role: null,
    isAuthen: false,
  }),
  actions: {
    async register(email, password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        this.user = user;
        this.role = "user";
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          role: this.role,
        });
      } catch (error) {
        console.error("Register Error:", error.message);
        throw error;
      }
    },
    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          this.user = user;
          this.role = docSnap.data().role;
          this.isAuthen = true;
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        console.error("Login Error:", error.message);
        throw error; // โยน Error กลับไปยังฟังก์ชันที่เรียกใช้งาน
      }
    },
    logout() {
      this.user = null;
      this.role = null;
    },
  },
});
