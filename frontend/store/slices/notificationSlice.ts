import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getNotifications, markSeen, Notification } from '@/lib/api/notifications';

interface NotificationState {
    notifications: Notification[];
    loading: boolean;
    error: boolean;
}

const initialState: NotificationState = {
    notifications: [],
    loading: false,
    error: false,
};

export const fetchNotificationsAsync = createAsyncThunk(
    'notifications/fetchAll',
    async () => {
        return await getNotifications();
    }
);

export const markSeenAsync = createAsyncThunk(
    'notifications/markSeen',
    async (id: number) => {
        await markSeen(id);
        return id;
    }
);

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            // Add to front of list
            state.notifications = [action.payload, ...state.notifications];
        },
        updateNotification: (state, action: PayloadAction<Notification>) => {
            const index = state.notifications.findIndex(n => n.id === action.payload.id);
            if (index !== -1) {
                state.notifications[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotificationsAsync.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchNotificationsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
            })
            .addCase(fetchNotificationsAsync.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(markSeenAsync.pending, (state, action) => {
                const id = action.meta.arg;
                const index = state.notifications.findIndex(n => n.id === id);
                if (index !== -1) {
                    state.notifications[index].is_seen = true;
                }
            })
            .addCase(markSeenAsync.rejected, (state, action) => {
                const id = action.meta.arg;
                const index = state.notifications.findIndex(n => n.id === id);
                if (index !== -1) {
                    state.notifications[index].is_seen = false;
                }
            });
    },
});

export const { addNotification, updateNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
