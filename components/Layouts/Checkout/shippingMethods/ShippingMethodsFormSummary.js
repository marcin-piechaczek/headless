const ShippingMethodsFormSummary = ({ selectedShippingMethods }) => {
  const { carrier_title, amount } = selectedShippingMethods;
  return (
    <>
      <div className="rounded overflow-hidden shadow-lg w-full">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">2. Shipping Methods</div>
          <p className="text-gray-700 text-base">{` ${carrier_title} `}</p>
          <p className="text-gray-700 text-base">{` ${amount.value} ${amount.currency} `}</p>
        </div>
      </div>
    </>
  );
};

export default ShippingMethodsFormSummary;
