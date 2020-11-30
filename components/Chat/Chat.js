import Safe from 'react-safe';

const Chat = () => {
  return (
    <>
      <Safe.script src="//code.tidio.co/8lg9h4i9tbx7k5yo2ws4m5hhbtaidmjj.js"></Safe.script>
      <Safe.script>{`try{Typekit.load({ async: true });}catch(e){}`}</Safe.script>
    </>
  );
};

export default Chat;
