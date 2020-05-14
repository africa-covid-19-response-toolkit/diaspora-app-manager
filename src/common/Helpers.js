// String.
export const stringSorter = (a, b) => {
  const stringA = a.toUpperCase(); // ignore upper and lowercase
  const stringB = b.toUpperCase(); // ignore upper and lowercase
  if (stringA < stringB) {
    return -1;
  }
  if (stringA > stringB) {
    return 1;
  }

  return 0;
};

// Date
export const dateSorter = (a, b) => {
  const dateA = Date.parse(a);
  const dateB = Date.parse(b);
  if (dateA < dateB) {
    return -1;
  }
  if (dateA > dateB) {
    return 1;
  }
  return 0;
};
