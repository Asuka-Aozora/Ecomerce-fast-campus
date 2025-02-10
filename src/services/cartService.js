import { axiosInstance } from "@/lib/axios";
import { globalStore } from "@/store/store";

export const fetchCart = async (userId) => {
    try {
        const cartResponse = await axiosInstance.get("/carts", {
            params: {
                userId,
                _embed: "product"
            }
        })
        console.log(cartResponse.data);
        
        globalStore.dispatch({
            type: "CART_GET",
            payload: cartResponse.data
        })
    } catch (err) {
        console.log(err);
        
    }
}