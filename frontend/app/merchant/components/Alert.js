'use client'

import { Button } from '@/components/ui/button';
import { useGetMerchantByIdQuery } from '@/lib/features/merchant/registrationApi';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
    const [visible, setVisible] = useState(false);
    const [hasSeenCongrats, setHasSeenCongrats] = useState(false);

    const account = useSelector((state) => state.account);
    const { data, isError } = useGetMerchantByIdQuery('1864f72d-4dc1-4512-94e3-07f7f236ba52');

    useEffect(() => {
        const seen = localStorage.getItem('seenCongrats');
        setHasSeenCongrats(seen === 'true');
    }, []);

    useEffect(() => {
        if (data?.merchant?.status === 'ACTIVE' && !hasSeenCongrats) {
            setVisible(true);
        } else if (data?.merchant?.status !== 'ACTIVE') {
            setVisible(true);
        }
    }, [data, hasSeenCongrats]);

    const handleClose = () => {
        if (data?.merchant?.status === 'ACTIVE') {
            localStorage.setItem('seenCongrats', 'true');
        }
        setVisible(false);
    };

    if (isError || !visible) return null;

    const merchantStatus = data?.merchant?.status;

    let message = null;

    if (merchantStatus === 'ACTIVE') {
        message = (
            <p>
                🎉 <strong>Congratulations!</strong> Your registration has been approved! <br />
                Go ahead and build your empire in{" "}
                <Link href="/merchant/business-setting" className="font-medium text-blue-900 underline">
                    Business Settings
                </Link>. 🏪🚀
            </p>
        );
    } else {
        message = (
            <p>
                ⚠️ Looks like your registration isn’t complete. <br />
                Don’t leave your shop dreams hanging—finish it up in{" "}
                <Link href="/merchant/business-setting" className="font-medium text-blue-900 underline">
                    Business Settings
                </Link>. 🛍️
            </p>
        );
    }

    return (
        <div className="fixed top-4 z-50 p-4 right-4 bg-amber-50 text-amber-800 rounded-lg shadow-lg flex justify-between items-start space-x-4 border border-amber-100 max-w-md">
            <div className="flex-1">{message}</div>
            <Button variant="ghost" size="sm" onClick={handleClose} className="text-amber-800 hover:text-red-500">
                ✖
            </Button>
        </div>
    );
};

export default Alert;
