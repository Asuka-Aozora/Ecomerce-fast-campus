import { axiosInstance } from "@/lib/axios";
import { fetchCart } from "./cartService";

export const addToCart = async ({ userId, productId, quantity }) => {
  if (!userId) {
    alert("Please login first");
    return;
  }

  try {
    const cartResponse = await axiosInstance.get("/carts", {
      params: {
        userId,
        _embed: "product",
      },
    });

    const existingProduct = cartResponse.data.find(
      (cart) => cart.productId === productId
    );

    if (!existingProduct) {
      await axiosInstance.post("/carts", {
        userId,
        productId,
        quantity,
      });
    } else {
      const newQuantity = existingProduct.quantity + quantity;
      if (newQuantity > existingProduct.product.stock) {
        alert("Sorry, we're out of stock. Please try again later.");
        return;
      }
      await axiosInstance.patch(`/carts/${existingProduct.id}`, {
        quantity: newQuantity,
      });
    }

    alert("Item added to cart");
    fetchCart(userId);
  } catch (err) {
    console.log(err);
  }
};
