import { useMutation } from '@apollo/client';
import SET_GUEST_EMAIL from '../../queries/checkout/setGuestEmail.graphql';

const EditButton = ({ cartId }) => {
  const [setGuestEmail, { data, error, loading }] = useMutation(SET_GUEST_EMAIL);
  const changeEmailMockup = () =>
    setGuestEmail({
      variables: {
        email: 'test@test.com',
        cartId
      }
    });
  console.log({
    data,
    error,
    loading
  });
  return (
    <button
      onClick={changeEmailMockup}
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      Edit
    </button>
  );
};

export default EditButton;
