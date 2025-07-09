import React from "react";
import Swal from "sweetalert2";

const PaymentSection = ({ amount, onSuccess }) => {
  const handlePayment = () => {
    // Simulate payment success
    Swal.fire({
      title: "Payment Successful!",
      text: `You have paid $${amount}.`,
      icon: "success",
      confirmButtonText: "Continue",
    }).then(() => {
      onSuccess(); // Notify parent component
    });
  };

  return (
    <div className="bg-white border rounded-md shadow p-6 text-center">
      <h3 className="text-xl font-semibold mb-2">Pay Application Fees</h3>
      <p className="mb-4 text-gray-700">
        You need to pay <span className="font-bold">${amount}</span> to apply for this scholarship.
      </p>
      <button
        onClick={handlePayment}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentSection;