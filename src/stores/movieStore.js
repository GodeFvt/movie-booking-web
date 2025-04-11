import { defineStore } from "pinia";
import {
  collection,
  query,
  onSnapshot,
  getAggregateFromServer,
  where,
  count,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/init.js";

import { getToday } from "../lib/utils.js";

export const useMovieStore = defineStore("movieStore", {
  state: () => ({
    movies: [],
    genres: [],
    countMovieCurrentDate: 0,
  }),
  actions: {
    async getMovies() {
      try {
        const q = query(collection(db, "movies"));
        onSnapshot(q, (querySnapshot) => {
          this.movies = [];
          querySnapshot.forEach((doc) => {
            this.movies.push({ id: doc.id, ...doc.data() });
          });
          const genresSet = new Set();
          this.movies.forEach((movie) => {
            if (movie.genres) {
              movie.genres.forEach((genre) => genresSet.add(genre));
            }
          });
          this.genres = Array.from(genresSet);
        });
      } catch (error) {
        console.error(error);
      }
    },

    async getCountMovieCurrentDate() {
      try {
        const { startDate, endDate } = getToday();
        const coll = collection(db, "movies");
        const q = query(
          coll,
          where("startDate", "<=", endDate),
          where("endDate", ">=", startDate)
        );

        const snapshot = await getAggregateFromServer(q, {
          count: count(),
        });
        this.countMovieCurrentDate = snapshot.data().count;
      } catch (error) {
        console.error("Error getting movie count:", error);
      }
    },
  },
});
