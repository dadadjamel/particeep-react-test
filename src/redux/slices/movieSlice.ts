import { Movie, movies$ } from "../../api/movies";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

export type MovieStatus = "LIKED" | "DISLIKED" | "NEUTRAL";
export type MovieState = {
  movies: (Movie & {
    status: MovieStatus;
  })[];
};

export const fetchMovies = createAsyncThunk("movies", async () => {
  const response = await movies$;
  return response;
});

const initialState: MovieState = {
  movies: [],
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<Movie>) => {
      state.movies = state.movies.map((movie) => {
        if (movie.id !== action.payload.id) {
          return movie;
        }
        switch (movie.status) {
          case "NEUTRAL":
            return { ...movie, likes: movie.likes + 1, status: "LIKED" };
          case "LIKED":
            return { ...movie, likes: movie.likes - 1, status: "NEUTRAL" };
          case "DISLIKED":
            return {
              ...movie,
              likes: movie.likes + 1,
              status: "LIKED",
              dislikes: movie.dislikes - 1,
            };
        }
      });
    },
    toggleDislike: (state, action: PayloadAction<Movie>) => {
      state.movies = state.movies.map((movie) => {
        if (movie.id !== action.payload.id) {
          return movie;
        }
        switch (movie.status) {
          case "NEUTRAL":
            return {
              ...movie,
              dislikes: movie.dislikes + 1,
              status: "DISLIKED",
            };
          case "DISLIKED":
            return {
              ...movie,
              dislikes: movie.dislikes - 1,
              status: "NEUTRAL",
            };
          case "LIKED":
            return {
              ...movie,
              dislikes: movie.dislikes + 1,
              status: "DISLIKED",
              likes: movie.likes - 1,
            };
        }
      });
    },
    deleteMovie: (state, action: PayloadAction<Movie>) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload.id,
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload.map((movie) => ({
        ...movie,
        status: "NEUTRAL",
      }));
    });
  },
});

export const { deleteMovie, toggleDislike, toggleLike } = movieSlice.actions;

export default movieSlice.reducer;
