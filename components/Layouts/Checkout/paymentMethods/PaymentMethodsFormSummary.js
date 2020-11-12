const PaymentMethodFormSummary = ({ paymentMethod }) => {
  return (
    <>
      <div className="rounded overflow-hidden shadow-lg w-full">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">3. Payment Methods</div>
          <p className="text-gray-700 text-base">{` ${paymentMethod} `}</p>
        </div>
      </div>
    </>
  );
};

export default PaymentMethodFormSummary;
