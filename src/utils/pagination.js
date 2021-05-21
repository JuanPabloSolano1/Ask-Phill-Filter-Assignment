export const getPagination = (array = [], size = 1) => {
  const result = []
  const pagesAmount = Math.ceil(array.length / size)
  
  let index = 0;

  for (let i = 0; i < pagesAmount; i++) {
    result.push(array.slice(index, index + size));
    index += size;
  }

  return result;
};
