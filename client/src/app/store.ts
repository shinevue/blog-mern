import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../reducer/authReducer";
import blogReducer from "../reducer/blogReducer";
// import commentReducer from '../features/comments/commentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    // comments: commentReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
