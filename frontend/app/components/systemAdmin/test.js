'use client'
import axios from 'axios';
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const notificationSound = typeof window !== 'undefined' ?
    new Audio('/sounds/windows-notification.mp3') : null;

const NotificationTest = () => {
    const [notifications, setNotifications] = useState([])
    const [isConnected, setIsConnected] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            Notification.requestPermission().then(permission => {
                console.log('Notification permission:', permission)
            })
        }

        const socket = io('http://localhost:8000', {
            withCredentials: true,
            transports: ['websocket']
        })

        socket.on('connect', () => {
            setIsConnected(true)
            socket.emit('join-admin-room')
        })

        socket.on('disconnect', () => setIsConnected(false))

        socket.on('new-merchant', (data) => {
            setNotifications(prev => [data, ...prev.slice(0, 4)])

            if (Notification.permission === 'granted') {
                new Notification('New Merchant', {
                    body: data.message,
                    icon: '/notification-icon.png',
                    silent: false
                })
            }

            if (notificationSound && !isMuted) {
                notificationSound.currentTime = 0
                notificationSound.play().catch(console.error)
            }
        })

        return () => socket.disconnect()
    }, [isMuted])

    const sendTestNotification = async () => {
        const testData = {
            message: 'Test merchant needs approval',
            merchantId: 'test-' + Math.random().toString(36).slice(2, 8),
            businessName: 'Test Business',
            timestamp: new Date().toISOString()
        };

        try {
            await axios.post('http://localhost:8000/iopost', testData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
        } catch (error) {
            console.error('Error:', error)
            alert(`Error: ${error.response?.data?.error || error.message}`)
        }
    };

    const dismissNotification = (index) => {
        setNotifications(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <div className="fixed bottom-4 right-4 w-80 z-50">
        <div className="bg-white rounded-lg shadow-xl border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <span className={`text-sm ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
                        ({isConnected ? 'Online' : 'Offline'})
                    </span>
                </div>
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title={isMuted ? "Unmute notifications" : "Mute notifications"}
                >
                    {isMuted ? '🔇' : '🔔'}
                </button>
            </div>

            {/* Notifications List */}
            <div className="max-h-[60vh] overflow-y-auto">
                {notifications.map((notif, index) => (
                    <div
                        key={index}
                        className={`p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors animate-slide-in`}
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
                                onClick={() => dismissNotification(index)}
                                className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                ))}

                {notifications.length === 0 && (
                    <div className="p-4 text-center text-gray-500 text-sm">
                        No new notifications
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-gray-200">
                <button
                    onClick={sendTestNotification}
                    className="w-full py-2 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                >
                    Send Test Notification
                </button>
            </div>
        </div>

        <style jsx global>{`
            @keyframes slide-in {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
            .animate-slide-in {
                animation: slide-in 0.3s ease-out forwards;
            }
        `}</style>
    </div>
    )
}

export default NotificationTest