// src/Payment/PaymentForm.jsx
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams(); // scholarshipId
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { isPending, data: scholarship = {} } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    }
  });

  if (isPending) return <p className="text-center py-10">Loading...</p>;

  const amount = scholarship.applicationFees + scholarship.serviceCharge;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (error) {
      setError(error.message);
    } else {
      setError('');

      const res = await axiosSecure.post('/create-payment-intent', {
        amountInCents
      });
      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user.displayName,
            email: user.email
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          const transactionId = result.paymentIntent.id;

          const paymentData = {
            scholarshipId: id,
            userEmail: user.email,
            amount,
            transactionId,
            paymentMethod: result.paymentIntent.payment_method_types,
            paidAt: new Date()
          };

          const paymentRes = await axiosSecure.post('/payments', paymentData);
          if (paymentRes.data.insertedId) {
            await Swal.fire({
              icon: 'success',
              title: 'Payment Successful!',
              html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
              confirmButtonText: 'Continue to Application',
            });

            navigate(`/apply-scholarship/${id}`);
          }
        }
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        Pay ${amount} to Apply for <br /><span className="text-[#640d14]">{scholarship.universityName}</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="p-3 border rounded" />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          disabled={!stripe}
        >
          Pay ${amount}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;