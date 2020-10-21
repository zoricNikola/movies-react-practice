import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { getGenres } from "../../services/genreService";

const genresAdapter = createEntityAdapter({ selectId: (genre) => genre._id });

const initialState = genresAdapter.getInitialState();

export const fetchGenres = createAsyncThunk("genres/fetchGenres", getGenres);

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGenres.fulfilled]: (state, action) => {
      genresAdapter.upsertMany(state, action.payload.data);
    },
  },
});

export default genresSlice.reducer;

export const {
  selectAll: selectAllGenres,
  selectById: selectGenreById,
  selectIds: selectGenreIds,
} = genresAdapter.getSelectors((state) => state.genres);
