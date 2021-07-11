import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStoryDetailsApi, getUsersAPI } from '../../lib/API/myStories';

export const fetchUser = createAsyncThunk('users', async ({ address }, { rejectWithValue }) => {
  try {
    return await getUsersAPI({ address });
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchStoryDetails = createAsyncThunk('fetchUserStories', async ({ id }, { rejectWithValue }) => {
  try {
    return await getStoryDetailsApi({ id });
  } catch (err) {
    return rejectWithValue(err);
  }
});
