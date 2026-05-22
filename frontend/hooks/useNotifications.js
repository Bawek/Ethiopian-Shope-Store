'use client'
import { useState } from 'react'

export const useNotifications = () => {
    const [notifications, setNotifications] = useState([
        // Sample data
        {
            id: '1',
            title: 'New Order Received',
            message: 'Order #1234 for $199.99',
            read: false,
            createdAt: new Date()
        }
    ])

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        )
    }

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
    }

    return { notifications, markAsRead, deleteNotification }
}