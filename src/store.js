import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./features/movies/moviesSlice";
import genreReducer from "./features/genres/genreSlice";
import userReducer from "./features/user/userSlice";

export default configureStore({
  reducer: {
    movies: movieReducer,
    genres: genreReducer,
    user: userReducer,
  },
});
