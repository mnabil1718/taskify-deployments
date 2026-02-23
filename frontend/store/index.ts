import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './slices/boardSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
    reducer: {
        board: boardReducer,
        notifications: notificationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
