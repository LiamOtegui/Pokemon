export const toTitleCase = (str) => {
  let result = str[0].toUpperCase() + str.slice(1).toLowerCase()
  return result;
};
