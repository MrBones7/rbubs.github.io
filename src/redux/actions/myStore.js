import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getEpisodeDataApi, getStoreApi, getStoryDataApi } from '../../lib/API/myStore';

export const getStore = createAsyncThunk('store', async (_args, { rejectWithValue }) => {
  try {
    return await getStoreApi();
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getStoryDetails = createAsyncThunk('seasons', async ({ id }, { rejectWithValue }) => {
  try {
    return await getStoryDataApi({ id });
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getEpisodeDetails = createAsyncThunk('episodes', async ({ id }, { rejectWithValue }) => {
  try {
    return await getEpisodeDataApi({ id });
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const currentStory = createAction('SET_CURRENT_STORY');

export const setCurrentStory = (data) => {
  return {
    type: currentStory,
    payload: data,
  };
};
