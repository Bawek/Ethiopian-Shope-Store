'use client'
import NotificationWidget from '@/app/components/systemAdmin/Notification';
import { baseUrl } from '@/lib/features/cart/cartSlice';
import { storeNotifications } from '@/lib/features/notification/notificationSlice';
import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const POLLING_INTERVAL = 15000; // 15 seconds
const API_TIMEOUT = 5000; // 5 seconds

const MerchantNotification = () => {
    const dispatch = useDispatch();
    const pollingRef = useRef();
    const isMountedRef = useRef(true);
    const account = useSelector((state) => state.account)

    // Memoized fetch function with error handling
    const fetchNotifications = useCallback(async () => {
        if (!isMountedRef.current) return;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

            const res = await fetch(`${baseUrl}/notifications/get-all/${account.id}/read-all`, {
                signal: controller.signal,
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });

            clearTimeout(timeoutId);

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            if (isMountedRef.current) {
                dispatch(storeNotifications(data));
            }
        } catch (error) {
            if (isMountedRef.current) {
                console.error('Failed to fetch notifications:', error);
            }
        }
    }, [dispatch]);

    // Smart polling that pauses when tab is inactive
    const startPolling = useCallback(() => {
        if (pollingRef.current) {
            clearInterval(pollingRef.current);
        }

        fetchNotifications();

        pollingRef.current = setInterval(() => {
            if (document.visibilityState === 'visible') {
                fetchNotifications();
            }
        }, POLLING_INTERVAL);
    }, [fetchNotifications]);

    useEffect(() => {
        isMountedRef.current = true;
        startPolling();

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                fetchNotifications();
                startPolling();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            isMountedRef.current = false;
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (pollingRef.current) {
                clearInterval(pollingRef.current);
            }
        };
    }, [fetchNotifications, startPolling]);

    return (
        <div className='flex justify-center'>
            <NotificationWidget />
        </div>
    );
};

export default React.memo(MerchantNotification);
