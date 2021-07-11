import { combineReducers } from '@reduxjs/toolkit';
import myStoreSlice from './myStore';
import myStoriesSlice from './myStories';

const appReducer = combineReducers({
  storeData: myStoreSlice.reducer,
  myStories: myStoriesSlice.reducer
});

export default function rootReducer(state, action) {
  return appReducer(state, action);
}
