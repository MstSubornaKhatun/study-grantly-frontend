


import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { CreditCard } from 'lucide-react';

const PaymentForm = ({ amount, user, scholarshipId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  const { isPending, isLoading, data: scholarship = {} } = useQuery({
    queryKey: ['scholarship', scholarshipId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${scholarshipId}`);
      return res.data;
    },
  });

  if (isPending) return <p className="text-center py-10 text-gray-600">Loading...</p>;

  let totalAmount = 0;
let amountInCents = 0;
  if (!isLoading) 
  {
     totalAmount = scholarship.applicationFees + scholarship.serviceCharge;
     amountInCents = totalAmount * 100;
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setIsPaying(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
      setIsPaying(false);
      return;
    }

    try {
      setError('');
      const res = await axiosSecure.post('/create-payment-intent', { amountInCents });
      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setIsPaying(false);
      } else if (result.paymentIntent.status === 'succeeded') {
        const transactionId = result.paymentIntent.id;

        // Save payment
        const paymentRes = await axiosSecure.post('/payments', {
          scholarshipId,
          userEmail: user.email,
          amount: totalAmount,
          transactionId,
          paymentMethod: result.paymentIntent.payment_method_types,
          paidAt: new Date(),
        });

        if (paymentRes.data.insertedId) {
          if (typeof onSuccess === 'function') {
            await onSuccess(transactionId);
          }

          await Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            html:` <strong>Transaction ID:</strong> <code>${transactionId}</code>`,
            confirmButtonText: 'Go to My Applications',
          });

          navigate('/my-applications');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong during payment.');
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 sm:p-8">
      <h2 className="text-center text-2xl font-semibold text-[#640d14] mb-6">
        Pay <span className="text-black">${totalAmount}</span> to Apply for <br />
        <span className="text-lg font-medium">{scholarship.universityName}</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <label htmlFor="card-element" className="flex items-center gap-2 text-gray-700 font-medium">
          <CreditCard className="w-5 h-5 text-[#640d14]" />
          Card Details
        </label>

        <div
          className="p-3 border border-gray-300 rounded-md"
          style={{ backgroundColor: '#fafafa' }}
        >
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#000',
                  '::placeholder': {
                    color: '#a0aec0',
                  },
                  fontFamily: 'Arial, sans-serif',
                },
                invalid: {
                  color: '#e53e3e',
                },
              },
              hidePostalCode: true,
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || isPaying}
          className={`w-full py-3 rounded-md text-white text-lg font-semibold transition ${
            isPaying ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#640d14] hover:bg-[#500b10]'
          }`}
        >
          {isPaying ? 'Processing...' : `Pay $${totalAmount}`}
        </button>

        {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;