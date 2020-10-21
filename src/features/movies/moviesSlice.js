import { toast } from "react-toastify";
import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import * as service from "../../services/movieService";
import _ from "lodash";
import { paginate } from "./../../utils/pagginate";

const moviesAdapter = createEntityAdapter({ selectId: (movie) => movie._id });

const initialState = moviesAdapter.getInitialState({
  status: "idle",
  saveMovieStatus: "idle",
  error: null,
  saveMovieError: null,
});

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  service.getMovies
);

export const addNewMovie = createAsyncThunk(
  "movies/addNewMovie",
  service.createMovie
);

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  service.updateMovie
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  service.deleteMovie
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    movieLiked: (state, action) => {
      const movieId = action.payload;
      const movie = state.entities[movieId];
      if (movie) movie.liked = !movie.liked;
    },
    movieSaved: (state, action) => {
      state.saveMovieStatus = "idle";
    },
  },
  extraReducers: {
    [fetchMovies.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchMovies.fulfilled]: (state, action) => {
      state.status = "succeded";
      moviesAdapter.upsertMany(state, action.payload.data);
    },
    [fetchMovies.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addNewMovie.pending]: (state, action) => {
      state.saveMovieStatus = "pending";
    },
    [addNewMovie.fulfilled]: (state, action) => {
      moviesAdapter.addOne(state, action.payload.data);
      state.saveMovieStatus = "succeded";
    },
    [addNewMovie.rejected]: (state, action) => {
      state.saveMovieStatus = "failed";
      state.saveMovieError = action.error.message;
    },
    [updateMovie.pending]: (state, action) => {
      state.saveMovieStatus = "pending";
    },
    [updateMovie.fulfilled]: (state, action) => {
      moviesAdapter.upsertOne(state, action.payload.data);
      state.saveMovieStatus = "succeded";
    },
    [updateMovie.rejected]: (state, action) => {
      state.saveMovieStatus = "failed";
      state.saveMovieError = action.error.message;
    },
    [deleteMovie.pending]: (state, action) => {
      moviesAdapter.removeOne(state, action.meta.arg._id);
    },
    [deleteMovie.fulfilled]: (state, action) => {
      toast.info("Movie deleted");
    },
    [deleteMovie.rejected]: (state, action) => {
      moviesAdapter.addOne(state, action.meta.arg);
    },
  },
});

export const { movieLiked, movieSaved } = moviesSlice.actions;

export default moviesSlice.reducer;

export const {
  selectAll: selectAllMovies,
  selectById: selectMovieById,
  selectIds: selectMovieIds,
} = moviesAdapter.getSelectors((state) => state.movies);

export const selectPageData = createSelector(
  [selectAllMovies, (state, options) => options],
  (movies, options) => {
    const {
      currentPage,
      pageSize,
      searchQuery,
      selectedGenre,
      sortColumn,
    } = options;

    let filtered = movies;
    if (searchQuery)
      filtered = movies.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = movies.filter(
        (movie) => movie.genre._id === selectedGenre._id
      );

    const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);

    const data = paginate(sorted, currentPage, pageSize);

    const ids = data.map((movie) => movie._id);

    return { totalCount: filtered.length, filteredIds: ids };
  }
);
