import EditButton from '../../../Buttons/EditButton';

const ShippingInformationFormSummary = ({ customer, cartId }) => {
  const { city, country, firstname, lastname, postcode, region, street, telephone } = customer;
  return (
    <>
      <div className="rounded overflow-hidden shadow-lg w-full">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">1. Address</div>
          <p className="text-gray-700 text-base">{` ${firstname} ${lastname} `}</p>
          <p className="text-gray-700 text-base">{` ${postcode} ${city} `}</p>
          <p className="text-gray-700 text-base">{` ${street} `}</p>
          {/*<EditButton cartId={cartId} />*/}
        </div>
      </div>
    </>
  );
};

export default ShippingInformationFormSummary;
