'use client';
import { useState } from 'react';
import { BellIcon, Menu } from 'lucide-react';
import { NavUser } from '@/components/ui/my-components/nav-user';
import { useSelector } from 'react-redux';
import { useLogout } from '@/util/userLogout';
import { ModeToggle } from '@/app/components/ModeToggle';
import { useRouter } from 'next/navigation';
import { useSidebar } from "@/components/ui/sidebar";
import { selectUnreadCount } from '@/lib/features/notification/notificationSlice';

export default function MerchantNavBar() {
    const notifications = useSelector(selectUnreadCount);
    const { isMobile, toggleSidebar } = useSidebar();
    const router = useRouter();
    const user = useSelector((state) => state.account);
    const logout = useLogout();
    return (
        <nav className="shadow-sm p-4 w-full sticky top-0 bg-white dark:bg-gray-900 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Menu
                        onClick={toggleSidebar}
                        className="w-6 h-6 text-muted-foreground md:hidden cursor-pointer hover:text-primary hover:bg-amber-100"
                    />
                </div>
                <div className="flex items-center space-x-3 ml-auto">
                    <ModeToggle />

                    <button
                        onClick={() => router.push('/merchant/notification')}
                        className="p-2 rounded-full relative hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <BellIcon className="h-6 w-6 dark:text-white" />
                        <span className="absolute top-0 right-0 text-xs font-semibold text-amber-600 rounded-full">
                            {notifications?.length || 0}
                        </span>
                    </button>
                    <NavUser user={user} logout={logout} />
                </div>
            </div>
        </nav>
    );
}
