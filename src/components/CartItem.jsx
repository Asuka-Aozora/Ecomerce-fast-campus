import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Button } from "./ui/button";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { axiosInstance } from "@/lib/axios";
import { fetchCart } from "@/services/cartService";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';


export const CartItem = ({ imageUrl, name, price, quantityProps, stock, cartId }) => {
    const userSelector = useSelector(state => state.user)
    const [quantity, setQuantity] = useState(quantityProps)
    const debouncedUpdateCart = useDebouncedCallback(() => {
        updateCartQuantity()
    }, 1500)

    const removeCartItem = async () => {
        try {
            alert("Item removed")
            await axiosInstance.delete(`/carts/${cartId}`);
            fetchCart(userSelector.id)
        } catch (err) {
            console.log(err);
            
        }
    }

    const updateCartQuantity = async () => {
        try {
            await axiosInstance.patch(`/carts/${cartId}`, {
                quantity: quantity
            });
            fetchCart(userSelector.id)
        } catch (err) {
            console.log(err);
            
        }
    }

    useEffect(() => {
        debouncedUpdateCart()
    }, [quantity]);

    return (
        <div className="flex gap-4 ">
            <div className="aspect-square w-full overflow-hidden rounded-md max-w-52">
                <img src={imageUrl} alt={name} className="w-full" />
            </div>
            <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col">
                    <p>{name}</p>
                    <p className="font-bold">Rp {Number(price).toLocaleString('id-ID')}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Button
                            disabled={quantity < 2}
                            onClick={() => setQuantity(quantity - 1)}
                            variant="ghost"
                            size="icon"
                        >
                            <IoIosRemove className="w-4 h-4" />
                        </Button>
                        <p className="text-lg font-bold">{quantity}</p>
                        <Button
                            disabled={quantity >= stock}
                            onClick={() => setQuantity(quantity + 1)}
                            variant="ghost"
                            size="icon"
                        >
                            <IoIosAdd className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        {stock < quantity ? (
                            <IoClose className="text-red-500 h-6 w-6 transition-transform duration-200 hover:scale-110" />
                        ) : (
                            <IoCheckmark className="text-green-500 h-6 w-6 transition-transform duration-200 hover:scale-110" />
                        )}
                        <span className="text-sm text-muted-foreground">
                            {stock < quantity ? "Out of Stock" : "In Stock"}
                        </span>
                    </div>

                    <Button onClick={removeCartItem} className="font-light text-destructive" variant="link" size="sm">
                        Remove Item
                    </Button>
                </div>
            </div>
        </div>
    )
}

