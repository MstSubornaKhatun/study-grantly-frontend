// src/Payment/Payment.jsx
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

const Payment = ({ amount, user, scholarshipId, onSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        amount={amount}
        user={user}
        scholarshipId={scholarshipId}
        onSuccess={onSuccess}
      />
    </Elements>
  );
};

export default Payment;








// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import React from 'react';
// import PaymentForm from './PaymentForm';

// const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

// const Payment = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <PaymentForm />
//     </Elements>
//   );
// };

// export default Payment;