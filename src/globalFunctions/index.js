import { getProducts } from "api/products.api";
import { getOrders } from "api/orders.api";
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
export async function getOrderById(id) {
  const orders = await getOrders();
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].id === id) {
      return orders[i];
    }
  }
}
