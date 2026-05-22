// api/notifications.js

import { baseUrl } from "@/lib/features/cart/cartSlice";
import {
    fetchNotificationsStart,
    storeNotifications,
    fetchNotificationsError
} from "@/lib/features/notification/notificationSlice";
import { store } from "@/lib/store";


const API_BASE_URL = baseUrl;

export const NotificationService = {
    /**
     * Fetch notifications for a user
     * @param {string} accountId - User ID
     * @param {string} userType - 'admin', 'customers', or 'merchants'
     */
    async fetchNotifications(accountId, userType = 'admin') {
        try {
            store.dispatch(fetchNotificationsStart);

            const response = await fetch(`${API_BASE_URL}/notifications/get-notfication/${accountId}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            store.dispatch(storeNotifications(data?.data || []));
            return notifications;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            store.dispatch(fetchNotificationsError(error.message));
            throw error;
        }
    },

    /**
     * Mark notification as read
     * @param {string} notificationId 
     */
    async markAsRead(notificationId) {
        try {
            const response = await fetch(`${API_BASE_URL}/notifications/mark-as-read/${notificationId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw error;
        }
    },

    /**
     * Create a new notification
     * @param {object} notificationData 
     */
    async createNotification(notificationData) {
        try {
            const response = await fetch(`${API_BASE_URL}/notifications/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(notificationData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating notification:', error);
            throw error;
        }
    },

    /**
     * Delete a notification
     * @param {string} notificationId 
     */
    async deleteNotification(notificationId) {
        try {
            const response = await fetch(`${API_BASE_URL}/notifications/delete/${notificationId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error deleting notification:', error);
            throw error;
        }
    }
};
//store

export default NotificationService;