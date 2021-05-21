// Comment
export const filterByProps = (array = [], props = {}) => {
  return array.filter((item) => {
    return Object.keys(props).every((key) => {
      if (props[key].length < 1) return true;
      return item[key].some((keyProduct) => props[key].includes(keyProduct));
    });
  });
};
