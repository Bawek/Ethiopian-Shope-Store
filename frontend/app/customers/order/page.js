'use client';

import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, Truck, ChevronRight } from 'lucide-react';
import { useGetOrdersByUserIdQuery } from '@/lib/features/orders/ordersApi';
import { useSelector } from 'react-redux';
import Link from 'next/link';
export default function OrderTrackingPage() {
    const account = useSelector((state) => state.account);
    const { data: ordersData, isLoading, error: apiError } = useGetOrdersByUserIdQuery(account.id);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [sent, setSent] = useState(false);
    const [activeTab, setActiveTab] = useState('details');
    React.useEffect(() => {
        if (sent) {
            const timer = setTimeout(() => setSent(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [sent]);

    React.useEffect(() => {
        if (ordersData?.orders?.length > 0 && !selectedOrderId) {
            setSelectedOrderId(ordersData.orders[0].id);
        }
    }, [ordersData, selectedOrderId]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'PROCESSING': return <Clock className="w-5 h-5 text-amber-500" />;
            case 'SHIPPED': return <Truck className="w-5 h-5 text-blue-500" />;
            case 'DELIVERED': return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'CANCELLED': return <AlertCircle className="w-5 h-5 text-red-500" />;
            default: return <Clock className="w-5 h-5 text-gray-500" />;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-lg font-medium text-gray-700">Loading your orders...</p>
            </div>
        );
    }

    if (apiError) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-10">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
                    <h2 className="text-xl font-bold text-red-700 mb-2">Error Loading Orders</h2>
                    <p className="text-gray-700 mb-4">Failed to load your order details. Please try again later.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!ordersData?.orders?.length) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-10">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                    <AlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <h2 className="text-xl font-bold text-gray-700 mb-2">No Orders Found</h2>
                    <p className="text-gray-700 mb-4">You haven't placed any orders yet.</p>
                </div>
            </div>
        );
    }

    const selectedOrder = ordersData.orders.find(order => order.id === selectedOrderId) || ordersData.orders[0];

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header with order selection */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Orders</h1>
                    <div className="mt-4">
                        <select
                            value={selectedOrderId}
                            onChange={(e) => setSelectedOrderId(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            {ordersData.orders.map(order => (
                                <option key={order.id} value={order.id}>
                                    Order #{order.id} - {formatDate(order.createdAt)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mt-4 md:mt-0">
                    <button
                        onClick={() => window.print()}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                        Print Receipt
                    </button>
                </div>
            </div>

            {/* Order status */}
            <div className="flex items-center mb-8">
                {getStatusIcon(selectedOrder.status)}
                <span className="ml-2 text-lg font-medium text-gray-700 capitalize">
                    {selectedOrder.status.toLowerCase()}
                </span>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'details' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Order Details
                    </button>
                    <button
                        onClick={() => setActiveTab('tracking')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'tracking' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Tracking Information
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Order Details */}
                <div className="lg:col-span-2 space-y-6">
                    {activeTab === 'details' ? (
                        <>
                            {/* Items List */}
                            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900">Items Ordered</h2>
                                </div>
                                <ul className="divide-y divide-gray-200">
                                    {selectedOrder.items.map((item) => (
                                        <li key={item.id} className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                                    <div className="flex justify-between">
                                        <span className="text-base font-medium text-gray-900">Total</span>
                                        <span className="text-base font-bold text-gray-900">${selectedOrder.totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Information */}
                            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900">Order Information</h2>
                                </div>
                                <div className="px-6 py-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
                                            <p className="mt-1 text-sm text-gray-900">{formatDate(selectedOrder.createdAt)}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Tranasaction Id</h3>
                                            <p className="mt-1 text-sm text-gray-900 capitalize">{selectedOrder.paymentMethod}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* Tracking Information Tab */
                        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Order Tracking</h2>
                            </div>
                            <div className="px-6 py-4">
                                <div className="space-y-6">
                                    <div className="relative">
                                        {/* Timeline */}
                                        <div className="overflow-hidden">
                                            <div className="relative pb-8">
                                                <div className="absolute top-4 bottom-0 left-4 w-0.5 bg-gray-200"></div>

                                                {/* Timeline items */}
                                                <div className="relative flex items-start group">
                                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                                                        <CheckCircle className="h-5 w-5 text-white" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <p className="text-sm font-medium text-gray-900">Order placed</p>
                                                        <p className="text-sm text-gray-500">{formatDate(selectedOrder.createdAt)}</p>
                                                    </div>
                                                </div>

                                                {selectedOrder.status === 'SHIPPED' || selectedOrder.status === 'DELIVERED' ? (
                                                    <div className="relative flex items-start group mt-4">
                                                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                                                            <CheckCircle className="h-5 w-5 text-white" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <p className="text-sm font-medium text-gray-900">Order shipped</p>
                                                            <p className="text-sm text-gray-500">{formatDate(selectedOrder.updatedAt)}</p>
                                                        </div>
                                                    </div>
                                                ) : null}

                                                {selectedOrder.status === 'DELIVERED' ? (
                                                    <div className="relative flex items-start group mt-4">
                                                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                                                            <CheckCircle className="h-5 w-5 text-white" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <p className="text-sm font-medium text-gray-900">Order delivered</p>
                                                            <p className="text-sm text-gray-500">{formatDate(selectedOrder.updatedAt)}</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="relative flex items-start group mt-4">
                                                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center">
                                                            <Clock className="h-5 w-5 text-white" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {selectedOrder.status === 'SHIPPED' ? 'Out for delivery' : 'Processing'}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                {selectedOrder.status === 'SHIPPED'
                                                                    ? 'Estimated delivery soon'
                                                                    : 'Your order is being processed'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Order Summary */}
                <div className="space-y-6">
                    {/* Order Summary */}
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
                        </div>
                        <div className="px-6 py-4 space-y-4">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Order Date</span>
                                <span className="text-sm font-medium text-gray-900">{formatDate(selectedOrder.createdAt)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Order Status</span>
                                <span className="text-sm font-medium text-gray-900 capitalize">{selectedOrder.status.toLowerCase()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Payment Method</span>
                                <span className="text-sm font-medium text-gray-900 capitalize">{selectedOrder.paymentMethod}</span>
                            </div>
                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex justify-between">
                                    <span className="text-base font-medium text-gray-900">Total</span>
                                    <span className="text-base font-bold text-gray-900">${selectedOrder.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Help Section */}
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">More Options</h2>
                        </div>
                        <div className="px-6 py-4">

                            <Link
                                href="/customers/company/contact"
                                className="group mt-4 flex items-center justify-between text-sm font-medium text-blue-600 hover:text-blue-800"
                            >
                                Contact Us
                                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}