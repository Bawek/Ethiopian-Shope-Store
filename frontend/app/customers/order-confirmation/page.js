'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { baseUrl } from '@/lib/features/cart/cartSlice';
import useCart from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Loader2, Printer, CheckCircle, XCircle, ShoppingBag } from 'lucide-react';

const OrderConfirmation = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const txRef = searchParams.get('tx_ref');
    const { emptyCart } = useCart();
    const [status, setStatus] = useState('loading' | 'success' | 'error');
    const [paymentData, setPaymentData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const printRef = useRef(null);
    useEffect(() => {
        const verifyPayment = async () => {
            if (!txRef) {
                setStatus('error');
                setErrorMessage("Missing transaction reference.");
                return;
            }

            try {
                const res = await axios.get(`${baseUrl}/orders/payment/frontend-check?tx_ref=${txRef}`);
                console.log('Payment verification response:', res.data);

                const { data, status: paymentStatus, shopOwner, shopName } = res.data;
                setPaymentData({ ...data, shopOwner, shopName });
                if (paymentStatus === 'success') {
                    await emptyCart();
                    setStatus('success');
                } else {
                    setStatus('error');
                    setErrorMessage("Payment verification failed. Please try again.");
                }
            } catch (error) {
                console.error('Payment verification error:', error);
                setStatus('error');
                setErrorMessage(
                    axios.isAxiosError(error)
                        ? error.response?.data?.message || "Payment verification failed"
                        : "Something went wrong verifying your payment"
                );
            }
        };

        verifyPayment();
    }, []);

    const handlePrint = () => {
                console.log(paymentData, 'the payment data here is ')

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
    <html>
        <head>
            <title>Payment Receipt - ${paymentData.tx_ref}</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
                
                body { 
                    font-family: 'Montserrat', Arial, sans-serif; 
                    margin: 0; 
                    padding: 0;
                    background-color: #f5f5f5;
                    color: #333;
                }
                
                .watermark {
                    position: fixed;
                    opacity: 0.1;
                    font-size: 120px;
                    font-weight: bold;
                    color: #0066cc;
                    transform: rotate(-30deg);
                    z-index: -1;
                    top: 30%;
                    left: 10%;
                    pointer-events: none;
                    white-space: nowrap;
                }
                
                .receipt-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 20px;
                }
                
                .receipt {
                    max-width: 600px;
                    width: 100%;
                    margin: 0 auto;
                    background: white;
                    padding: 40px;
                    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                    position: relative;
                    overflow: hidden;
                }
                
                .header { 
                    text-align: center; 
                    margin-bottom: 30px;
                    position: relative;
                }
                
                .logo { 
                    font-size: 28px; 
                    font-weight: 700; 
                    margin-bottom: 5px;
                    color: #0066cc;
                    letter-spacing: 1px;
                }
                
                .tagline {
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 20px;
                }
                
                .title { 
                    font-size: 24px; 
                    font-weight: 600; 
                    margin: 30px 0;
                    text-align: center;
                    color: #0066cc;
                    position: relative;
                }
                
                .title:after {
                    content: "";
                    display: block;
                    width: 80px;
                    height: 3px;
                    background: #0066cc;
                    margin: 10px auto;
                }
                
                .section { 
                    margin: 20px 0; 
                }
                
                .row { 
                    display: flex; 
                    justify-content: space-between; 
                    margin: 12px 0;
                    font-size: 15px;
                }
                
                .bold { 
                    font-weight: 600; 
                }
                
                .divider { 
                    border-top: 1px dashed #ddd; 
                    margin: 25px 0; 
                }
                
                .footer { 
                    text-align: center; 
                    font-size: 13px; 
                    margin-top: 40px; 
                    color: #666;
                }
                
                .success { 
                    color: #28a745;
                    font-weight: 600;
                }
                
                .failed { 
                    color: #dc3545;
                    font-weight: 600;
                }
                
                .signature-section {
                    margin-top: 40px;
                    text-align: right;
                }
                
                .signature-line {
                    border-top: 1px solid #ccc;
                    width: 200px;
                    display: inline-block;
                    margin-top: 50px;
                }
                
                .signature-name {
                    margin-top: 5px;
                    font-weight: 600;
                    font-style: italic;
                }
                
                .receipt-number {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    font-size: 14px;
                    color: #666;
                }
                
                .highlight-box {
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                
                .thank-you {
                    font-size: 18px;
                    text-align: center;
                    margin: 30px 0;
                    color: #0066cc;
                    font-weight: 600;
                }
            </style>
        </head>
        <body>
            <div class="watermark">${paymentData.shopName}</div>
            
            <div class="receipt-container">
                <div class="receipt">
                    <div class="receipt-number">Receipt #${paymentData.reference}</div>
                    
                    <div class="header">
                        <div class="logo">${paymentData.shopName}</div>
                        <div class="tagline">Official Payment Receipt</div>
                    </div>
                    
                    <div class="title">PAYMENT RECEIPT</div>
                    
                    <div class="section">
                        <div class="row">
                            <span>Date & Time:</span>
                            <span class="bold">${new Date(paymentData.created_at).toLocaleString()}</span>
                        </div>
                        <div class="row">
                            <span>Transaction ID:</span>
                            <span class="bold">${paymentData.tx_ref}</span>
                        </div>
                    </div>
                    
                    <div class="divider"></div>
                    
                    <div class="section">
                        <div class="row bold">
                            <span>Customer Information</span>
                            <span></span>
                        </div>
                        <div class="row">
                            <span>Full Name:</span>
                            <span class="bold">${paymentData.first_name} ${paymentData.last_name}</span>
                        </div>
                        <div class="row">
                            <span>Email Address:</span>
                            <span>${paymentData.email}</span>
                        </div>
                        <div class="row">
                            <span>Phone Number:</span>
                            <span>${paymentData.phone_number}</span>
                        </div>
                    </div>
                    
                    <div class="divider"></div>
                    
                    <div class="highlight-box">
                        <div class="row">
                            <span>Payment Method:</span>
                            <span class="bold">${paymentData.method.toUpperCase()} (${paymentData.mode.toUpperCase()})</span>
                        </div>
                        <div class="row">
                            <span>Transaction Status:</span>
                            <span class="${paymentData.status === 'success' ? 'success' : 'failed'}">
                                ${paymentData.status.toUpperCase()}
                            </span>
                        </div>
                        <div class="row">
                            <span>Order id:</span>
                            <span class="${paymentData.status === 'success' ? 'success' : 'failed'}">
                                ${paymentData.meta.orderId}
                            </span>
                        </div>
                    </div>
                    
                    <div class="section">
                        <div class="row">
                            <span>Subtotal:</span>
                            <span>${(paymentData.amount - paymentData.charge).toFixed(2)} ${paymentData.currency}</span>
                        </div>
                        <div class="row">
                            <span>Processing Fee:</span>
                            <span>${paymentData.charge} ${paymentData.currency}</span>
                        </div>
                        <div class="row bold" style="font-size: 16px; margin-top: 15px;">
                            <span>TOTAL AMOUNT:</span>
                            <span>${paymentData.amount} ${paymentData.currency}</span>
                        </div>
                    </div>
                    
                    <div class="thank-you">
                        Thank you for your business!
                    </div>
                    
                    <div class="signature-section">
                        <div class="signature-line"></div>
                        <div class="signature-name">${paymentData.shopOwner}</div>
                        <div style="font-size: 12px; margin-top: 3px;">Authorized Signature</div>
                    </div>
                    
                    <div class="footer">
                        <div>This is an official receipt for your records</div>
                        <div>For any inquiries, please contact ${paymentData.shopName} support</div>
                        <div style="margin-top: 10px;">Generated on: ${new Date().toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </body>
    </html>
`);
        printWindow.document.close();
        printWindow.focus();

        // Wait for content to load before printing
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 200);
    };

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                <h2 className="text-xl font-semibold">Verifying Payment</h2>
                <p className="text-gray-500">Please wait while we confirm your transaction...</p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="max-w-md mx-auto p-6 text-center">
                <div className="bg-red-50 rounded-lg p-6">
                    <XCircle className="w-16 h-16 mx-auto text-red-600 mb-4" />
                    <h1 className="text-2xl font-bold text-red-800 mb-2">Payment Issue</h1>
                    <p className="text-gray-700 mb-4">{errorMessage}</p>
                    <div className="flex gap-4 justify-center">
                        <Button
                            variant="outline"
                            onClick={() => router.push('/customers/cart')}
                        >
                            Back to Cart
                        </Button>
                        <Button
                            onClick={() => router.push('/customers/placeOrder')}
                        >
                            Try Checkout Again
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6">
            <div className="bg-green-50 rounded-lg p-6 text-center">
                <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" />
                <h1 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h1>

                <div className="bg-white p-4 rounded-md mb-4 text-left">
                    <p className="font-medium">Transaction Reference:</p>
                    <p className="font-mono bg-gray-100 p-2 rounded">{txRef}</p>
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        onClick={handlePrint}
                        className="gap-2"
                    >
                        <Printer className="w-5 h-5" />
                        Print Receipt
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => router.push('/customers/order')}
                        className="gap-2"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        View Your Orders
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;