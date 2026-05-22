'use client'
import React, { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Bell } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectNotifications,
  selectUnreadCount,
  selectNotificationLoading,
  selectNotificationError
} from '@/lib/features/notification/notificationSlice'
import NotificationWidget from '@/app/components/systemAdmin/Notification'
import NotificationService from '@/util/notificationServices'

const AdminNotificationList = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectNotifications)
  const unreadCount = useSelector(selectUnreadCount)
  const isLoading = useSelector(selectNotificationLoading)
  const error = useSelector(selectNotificationError)
  const user = useSelector(state => state.account)
  console.log(user, 'user in admin notification list')
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (user?.id) {
          const data = await NotificationService.fetchNotifications(user.id, 'admin')
          console.log('Fetched notifications:', data)
        }
      } catch (err) {
        console.error('Failed to fetch notifications:', err)
      }
    }

    fetchNotifications()

    // Optional: Set up real-time updates with WebSocket or polling
    const interval = setInterval(fetchNotifications, 60000) // Refresh every minute

    return () => clearInterval(interval)
  }, [user?.id])

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        Error loading notifications: {error}
        <button
          onClick={() => NotificationService.fetchNotifications(user?.id, 'admin')}
          className="ml-2 text-blue-500 hover:underline"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mt-0 pt-0 mx-auto bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200">
        <h2 className="text-lg sticky top-1 font-semibold flex items-center justify-center gap-2">
          <Bell className="h-5 w-5 text-blue-600" />
          Notifications
          <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {unreadCount} unread
          </span>
        </h2>
      </div>

      <div className="divide-y divide-gray-100">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="p-4">
              <Skeleton className="h-4 w-[200px] mb-2" />
              <Skeleton className="h-3 w-[300px] mb-2" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
          ))
        ) : notifications?.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No notifications available
          </div>
        ) : (
          <div className='w-1/2 mx-auto'>
            <NotificationWidget
              notifications={notifications}
              onMarkAsRead={(id) => NotificationService.markAsRead(id)}
              onDelete={(id) => NotificationService.deleteNotification(id)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminNotificationList