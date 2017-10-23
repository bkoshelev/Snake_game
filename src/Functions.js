const randomInteger = (min, max) => {
  // const rand = min - (0.5 + (Math.random() * ((max - min) + 1)));
  // const result = Math.abs(Math.round(rand));
  // return result;
  const rand = min + (Math.random() * ((max + 1) - min));
  const result = Math.floor(rand);
  return result;
};

export default randomInteger;
