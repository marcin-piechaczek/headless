const useLogger = (message, fn) => {
  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  console.log(`[${time}] - ${message}`, fn);
};

export default useLogger;
