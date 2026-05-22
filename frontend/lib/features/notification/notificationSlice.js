// features/notification/notificationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: {
        admin: [],
        customers: [],
        merchants: []
    },
    loading: false,
    error: null,
    lastFetched: null
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        // Start notification loading
        fetchNotificationsStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        // Store notifications from API
        storeNotifications: (state, action) => {
            state.loading = false;
            state.error = null;
            state.lastFetched = new Date().toISOString();

            // Sort by timestamp (newest first)
            state.notifications.admin = action.payload.sort((a, b) =>
                new Date(b.timestamp) - new Date(a.timestamp)
            );
        },

        // Handle fetch error
        fetchNotificationsError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Add a new notification
        addNotification: (state, action) => {
            state.notifications.admin.unshift({
                id: action.payload.id || Date.now(),
                type: action.payload.type || 'info',
                message: action.payload.message || '',
                isRead: false,
                timestamp: action.payload.timestamp || new Date().toISOString(),
                ...action.payload.metadata && { metadata: action.payload.metadata }
            });
        },

        // Clear all notifications
        clearNotifications: (state) => {
            state.notifications.admin = [];
        },

        // Mark all notifications as read
        markAllAsRead: (state) => {
            state.notifications.admin.forEach(notification => {
                notification.isRead = true;
            });
        },

        // Mark single notification as read
        markAsRead: (state, action) => {
            const notification = state.notifications.admin.find(
                n => n.id === action.payload
            );
            if (notification) {
                notification.isRead = true;
            }
        },

        // Remove a notification
        removeNotification: (state, action) => {
            state.notifications.admin = state.notifications.admin.filter(
                n => n.id !== action.payload
            );
        },

        // Reset notification state
        resetNotifications: () => initialState
    },
});

// Action creators
export const {
    fetchNotificationsStart,
    storeNotifications,
    fetchNotificationsError,
    addNotification,
    clearNotifications,
    markAllAsRead,
    markAsRead,
    removeNotification,
    resetNotifications
} = notificationSlice.actions;

// Selectors
export const selectNotifications = (state) =>
    state.notification.notifications.admin;

export const selectUnreadCount = (state) =>
    state.notification.notifications.admin.filter(n => !n.isRead).length;

export const selectNotificationLoading = (state) =>
    state.notification.loading;

export const selectNotificationError = (state) =>
    state.notification.error;

export const selectLastFetched = (state) =>
    state.notification.lastFetched;

export default notificationSlice.reducer;