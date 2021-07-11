import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, fetchStoryDetails } from '../actions/myStories';

const initialState = {
  isUserLoading: false,
  userData: [],
  storiesLoading: false,
  userStories: []
};

const myStoriesSlice = createSlice({
  name: 'myStories',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.isUserLoading = true;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.isUserLoading = false;
      state.userData = action.payload.data.records;
    },
    [fetchUser.rejected]: (state, action) => {
      state.isUserLoading = false;
      state.error = action.payload.error;
    },
    [fetchStoryDetails.pending]: (state) => {
      state.storiesLoading = true;
    },
    [fetchStoryDetails.fulfilled]: (state, action) => {
      state.storiesLoading = false;
      state.userStories.push(action.payload.data);
    },
    [fetchStoryDetails.rejected]: (state, action) => {
      state.storiesLoading = false;
      state.error = action.payload.error;
    },
  },
});

export default myStoriesSlice;
