import { CartItem } from "@/components/CartItem";
import { LoggedIn } from "@/components/guard/LoggedinPage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { axiosInstance } from "@/lib/axios";
import { fetchCart } from "@/services/cartService";
import { useSelector } from "react-redux";

const CartPage = () => {
  const cartSelector = useSelector((state) => state.cart);
  const userSelector = useSelector((state) => state.user);

  const subtotal = cartSelector.items.reduce(
    (a, b) => a + b.quantity * b.product.price,
    0
  );
  const tax = subtotal / 10;

  const handleCheckout = async () => {
    // check if all items are available
    for (let i = 0; i < cartSelector.items.length; i++) {
      const currentCartItem = cartSelector.items[i];

      if (currentCartItem.quantity > currentCartItem.product.stock) {
        alert("One of your items is  unavailable");
        return;
      }
    }

    // post all items to transactions history
    await axiosInstance.post("/transactions", {
      userId: userSelector.id,
      totalPrice: subtotal,
      tax,
      transactionDate: new Date(),
      items: cartSelector.items,
    });

    // update stock and delete cart
    await Promise.all(
      cartSelector.items.map(async (cartItem) => {
        await axiosInstance.patch(`/products/${cartItem.productId}`, {
          stock: cartItem.product.stock - cartItem.quantity,
        });
        await axiosInstance.delete(`/carts/${cartItem.id}`);
      })
    );

    fetchCart(userSelector.id);

    alert("Checkout success");
  };

  return (
    <LoggedIn>
      <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">My Cart</h1>

        <Separator className="mt-12 mb-8" />

        <div className="mt-10 grid grid-cols-12 gap-6">
          <div className="col-span-7">
            {cartSelector.items.map(({ product, quantity, id }) => (
              <CartItem
                key={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                quantityProps={quantity}
                stock={product.stock}
                cartId={id}
              />
            ))}
          </div>
          <div className="col-span-5">
            <Card className="bg-gray-50 border-0">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex pb-4 justify-between border-b">
                  <span className="text-sm text-muted-foreground">
                    Subtotal
                  </span>
                  <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>

                <div className="flex py-4 justify-between border-b">
                  <span className="text-sm text-muted-foreground">
                    Taxes (10%)
                  </span>
                  <span>Rp {tax.toLocaleString("id-ID")}</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col flex gap-6">
                <div className="flex justify-between w-full">
                  <span className="font-semibold text-muted-foreground">
                    Total
                  </span>
                  <span className="font-semibold">
                    Rp {(subtotal + tax).toLocaleString("id-ID")}
                  </span>
                </div>

                <Button onClick={handleCheckout} className="w-full">
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </LoggedIn>
  );
};

export default CartPage;
