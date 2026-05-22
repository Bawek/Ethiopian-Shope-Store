'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
    selectNotifications,
    clearNotifications,
    markAllAsRead,
    removeNotification
} from '@/lib/features/notification/notificationSlice';

const NotificationWidget = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(selectNotifications) || [];
    const [isMuted, setIsMuted] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const sendTestNotification = async () => {
        const testData = {
            message: 'Test merchant needs approval',
            merchantId: `test-${Math.random().toString(36).slice(2, 8)}`,
            businessName: 'Test Business',
            timestamp: new Date().toISOString()
        };

        try {
            await axios.post('http://localhost:8000/iopost', testData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            console.log(notifications, 'notiiiii')

        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.response?.data?.error || error.message}`);
        }
    };

    const dismissNotification = (id) => {
        dispatch(removeNotification(id));
    };

    const handleMarkAllRead = () => {
        dispatch(markAllAsRead());
    };

    const handleClearAll = () => {
        dispatch(clearNotifications());
    };

    return (
        <div className="w-80">
            <div className="rounded-lg border">
                {/* Notifications List */}
                <div className="max-h-[70vh] overflow-y-auto">
                    {(notifications && notifications.length > 0) ?
                        notifications.map((notif) => (
                            <div
                                key={notif.id}
                                className={`p-4 border-b last:border-0 hover:bg-gray-50 transition-colors ${!notif.isRead ? 'bg-blue-50' : ''
                                    }`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-sm text-gray-900">
                                                {notif.businessName}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(notif.timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">{notif.message}</p>
                                        <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                            ID: {notif.merchantId}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => dismissNotification(notif.id)}
                                        className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        ))
                        :
                        <h1> No Notifications Recorded.</h1>
                    }
                </div>

                {/* Footer */}
                <div className="p-2 border-t flex justify-between">
                    <div className="space-x-2">
                        <button
                            onClick={handleMarkAllRead}
                            className="text-xs text-gray-600 hover:text-blue-600"
                        >
                            Mark all read
                        </button>
                        <button
                            onClick={handleClearAll}
                            className="text-xs text-gray-600 hover:text-red-600"
                        >
                            Clear all
                        </button>
                    </div>
                    <button
                        onClick={sendTestNotification}
                        className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200"
                    >
                        Test
                    </button>
                </div>
            </div>

            <style jsx global>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default NotificationWidget;