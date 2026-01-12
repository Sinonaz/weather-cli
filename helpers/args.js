function getArgs(args) {
  const result = {};
  const [executor, file, ...rest] = args;

  rest.forEach((value, index, array) => {
    if (value.startsWith('-')) {
      if (index === array.length - 1) {
        result[value.substring(1)] = true;
      } else if (!array[index + 1].startsWith('-')) {
        result[value.substring(1)] = array[index + 1];
      } else {
        result[value.substring(1)] = true;
      }
    }
  });
  
  return result;
}

export { getArgs }