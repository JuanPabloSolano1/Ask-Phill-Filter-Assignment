import { information } from '../../miista-export';

export const data = information.data.allContentfulProductPage.edges
  .map((item) => {
    const { node } = item;
    return {
      label: node.name,
      colors: node.colorFamily
        ? node.colorFamily.map((color) => color.name)
        : [],
      categories: node.categoryTags
        ? node.categoryTags.map((category) =>
            category
              .replace(/^E+[0-9]/g, ' ')
              .replace(/[#-]/g, ' ')
              .replace(/I+[d]/g, 'id')
              .trim()
          )
        : [],
      prices: node.shopifyProductEu
        ? node.shopifyProductEu.variants.edges.map((price) => {
            return parseInt(price.node.price);
          })
        : [],
      image: node.thumbnailImage ? node.thumbnailImage.file.url : null,
    };
  })
  .filter((product) => product.prices != 0);
