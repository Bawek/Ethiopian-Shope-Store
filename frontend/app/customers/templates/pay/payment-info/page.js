'use client'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useVerifyPaymentMutation } from '@/lib/features/payment/paymentsApis';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { useBuyTemplateMutation } from '@/lib/features/templates/templateApi';
import { useSelector } from 'react-redux';
export default function SuccessInfoPage() {
  const params = useSearchParams();
  const [paymentData, setPaymentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accountId = useSelector((state) => state.account.id)
  const [verifyPayment] = useVerifyPaymentMutation();
  const [buyTemplate] = useBuyTemplateMutation()
  const tx_ref = params.get('tx_ref');
  const handlePrintReceipt = () => {
    const receiptWindow = window.open('', '_blank');
    const receiptContent = `
    <html>
    <head>

          <title>Payment Receipt</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@400;600&display=swap');
            
            body { 
              font-family: 'Montserrat', sans-serif; 
              padding: 30px; 
              max-width: 600px; 
              margin: 0 auto; 
              background: #f9f9f9;
              border: 15px solid #FFD700;
              border-image: linear-gradient(45deg, #FFD700, #FFA500) 1;
              position: relative;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            
            .certificate-border {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              background: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                #FFD700 10px,
                #FFD700 20px
              );
              z-index: -1;
            }
            
            .header { 
              text-align: center; 
              margin-bottom: 25px;
              border-bottom: 2px solid #FFD700;
              padding-bottom: 20px;
              display:flex;
              gap:5px;
            }
            
            .logo {
              max-width: 100px;
              margin: 0 auto 15px;
            }
            
            .motto {
              color: #4a5568;
              font-style: italic;
              margin: 10px 0;
            }
            
            .details { 
              margin: 30px 0; 
              padding: 20px;
              background: rgba(255,215,0,0.05);
              border-radius: 10px;
            }
            
            .detail-row { 
              display: flex; 
              justify-content: space-between; 
              margin: 15px 0; 
              padding: 10px;
              border-bottom: 1px dashed #e2e8f0;
            }
            
            .thank-you { 
              text-align: center; 
              margin-top: 30px;
              font-family: 'Great Vibes', cursive;
              font-size: 24px;
              color: #2d3748;
            }
            
            .signature {
              margin-top: 30px;
              text-align: right;
              padding-right: 50px;
            }
            
            .signature-img {
              height: 50px;
              opacity: 0.8;
            }
            
            .watermark {
              position: absolute;
              opacity: 0.1;
              font-size: 120px;
              transform: rotate(-45deg);
              top: 30%;
              left: 10%;
              white-space: nowrap;
              font-family: 'Great Vibes', cursive;
            }
          </style>
        </head>
        <body>
          <div class="certificate-border"></div>
          <div class="watermark">Payment Verified</div>
          
          <div class="header">
            <img
            class="logo"
                src='data:image/png;base64,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'
                alt="logo seen"
            />
              <div>
            <h2 style="color: #2d3748; margin: 10px 0;">OFFICIAL PAYMENT RECEIPT</h2>
            <p class="motto">"Empowering Ethiopian Dreams, One Transaction at a Time"</p>
          </div>
          </div>

          <div class="details">
            <div class="detail-row">
              <span>Date:</span>
              <span>${new Date().toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
              <span>Transaction ID:</span>
              <span style="font-family: monospace">${paymentData.tx_ref || ''}</span>
            </div>
            <div class="detail-row">
              <span>Amount:</span>
              <span style="font-weight: 600">
                ${paymentData.amount || ''} ${paymentData.currency || ''}
              </span>
            </div>
            <div class="detail-row">
              <span>Payment Method:</span>
              <span>Credit Card</span>
            </div>
          </div>

          <div class="thank-you">
            ~ Thank You for Your Payment ~
          </div>

          <div class="signature">
            <img src="data:image/png;base64,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" alt="Digital Signature" class="signature-img">
            <div style="margin-top: 10px;">
              <div>Mebrat Matebie</div>
              <div style="font-size: 0.9em; color: #718096">Chief Financial Officer</div>
            </div>
          </div>
        </body>
      </html>
    `;

    receiptWindow.document.write(receiptContent);
    receiptWindow.document.close();
    receiptWindow.focus();

    // Delay print to ensure content loads
    setTimeout(() => {
      receiptWindow.print();
    }, 500);
  };
  useEffect(() => {
    const verify = async () => {
      if (!tx_ref) {
        setError('Transaction reference not found');
        setLoading(false);
        return;
      }
      try {
        const res = await verifyPayment(tx_ref).unwrap();
        setPaymentData(res?.data)
        if (res.status !== 'success') {
          return setError('sorry! The transactions if Failed. please Try again.')
        }
      } catch (err) {
        console.error('Verification failed:', err);
        setError(err.data?.message || 'Payment verification failed');
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [tx_ref]);
console.log(paymentData,'payment data')
  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">Verifying your payment...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        <h2 className="text-xl font-bold">Verification Failed</h2>
        <p className="mt-2">{error}</p>
        <a href="/support" className="mt-4 inline-block text-blue-600">
          Contact Support
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <div className="text-green-500 text-6xl mb-4">✓</div>
      <h1 className="text-2xl font-bold mb-2">Payment Confirmed</h1>

      <div className="bg-gray-50 p-4 rounded-lg mt-6 text-left space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Amount:</span>
          <span className="font-medium">
            {paymentData.amount} {paymentData.currency}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Reference:</span>
          <span className="font-mono">****{paymentData.tx_ref?.slice(-4)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className="text-green-600 font-medium">Completed</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Button
          onClick={() => window.location.href = '/merchant'}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Go to Dashboard
        </Button>

        <Button
          onClick={handlePrintReceipt}
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          Print Receipt
        </Button>
      </div>
    </div>
  );
}