import { getProducts } from "api/products.api";
export async function getProductById(id) {
  const products = await getProducts();
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i];
    }
  }
  // return products.forEach((product) => {
  //   if (product.id === id) {
  //     return product;
  //   }
  // });
}
