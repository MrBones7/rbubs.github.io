import { createSlice } from '@reduxjs/toolkit';
import { getStore, getStoryDetails, currentStory, getEpisodeDetails } from '../actions';

const initialState = {
  isLoading: true,
  isStoryLoading: true,
  isEpisodeLoading: true,
  currentEpisode: {},
  currentStory: {},
  storeDetails: [],
  currentSeason: [],
};

const myStoreSlice = createSlice({
  name: 'storeData',
  initialState,
  reducers: {},
  extraReducers: {
    [getStore.pending]: (state) => {
      state.isLoading = true;
    },
    [getStore.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.storeDetails = action.payload.data.records;
    },
    [getStore.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    [getStoryDetails.pending]: (state) => {
      state.isStoryLoading = true;
    },
    [getStoryDetails.fulfilled]: (state, action) => {
      state.isStoryLoading = false;
      state.currentSeason = action.payload.data;
    },
    [getStoryDetails.rejected]: (state, action) => {
      state.isStoryLoading = false;
      state.error = action.payload.error;
    },
    [getEpisodeDetails.pending]: (state) => {
      state.isEpisodeLoading = true;
    },
    [getEpisodeDetails.fulfilled]: (state, action) => {
      state.isEpisodeLoading = false;
      state.currentEpisode = action.payload.data;
    },
    [getEpisodeDetails.rejected]: (state, action) => {
      state.isEpisodeLoading = false;
      state.error = action.payload.error;
    },
    [currentStory]: (state, action) => {
      state.currentStory = action.payload;
    },
  },
});

export default myStoreSlice;
