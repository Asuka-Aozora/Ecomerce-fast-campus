import { useState } from "react";
import { Button } from "./ui/button";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { addToCart } from "@/services/addToCart";

export const ProductCard = (props) => {
  const {imageUrl, productName, price, stock, productId, discount} = props;

  // const [message, setMessage] = useState("Add to cart")
  const [quantity, setQuantity] = useState(0)

  const userSelector = useSelector(state => state.user)

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1)
    }
  }
  
  const decrementQuantity = () => {
    if (quantity !== 0) {
      setQuantity(quantity - 1)
    }
    
  }

  // // MOUNT 
  // useEffect(() => {
  //   alert("COMPONENT SEDANG NGEMOUNT")
  // }, [])

  // // UPDATE/MOUNT
  // useEffect(() => {
  //   alert("component update")
  // }, [quantity])


  // useEffect(() => {
    
  //   // UNMOUNT
  //   return () => {
  //     alert("component unmount")
  //   }
  // }, [])

    return (
        <div className='p-4 border rounded-md md:max-w-96 flex flex-col gap-4'>
          <Link to={`/products/${productId}`} className='aspect-square w-full overflow-hidden'>
            <img
            className='w-full'
            src={imageUrl} 
            alt="product" 
            />
          </Link>
          
          <Link to={`/products/${productId}`}>
            <p className='text-md font-sans font-medium tracking-wide text-gray-900'>{productName}</p>
            <p>
              Rp {Number(price).toLocaleString('id-ID')}
            </p>
            {/* <p className='text-xl font-semibold'>
            Harga Diskon: Rp {Number(discount).toLocaleString('id-ID')}
            </p> */}
            <p className='text-muted-foreground'>In stock: {stock}</p>
          </Link>

          <div className="flex flex-col gap-2">
            {/* Button quantity */}
              <div className="flex justify-between items-center">
                <Button
                 disabled={quantity <= 0}
                 onClick={decrementQuantity}
                 size="icon"
                 variant="ghost">
                  <IoIosRemove className="h-6 w-6" />
                </Button>

                <p className="text-lg font-bold">{quantity}</p>

                <Button
                 disabled={quantity >= stock}
                 onClick={incrementQuantity}
                 size="icon"
                 variant="ghost">
                  <IoIosAdd className="h-6 w-6" />
                </Button>
              </div>

            <Button
              disabled={!stock || quantity < 1}
              onClick={() => addToCart({ userId: userSelector.id, productId, quantity })}
              className="w-full"
            >
              Add to Cart
            </Button>
          </div>
        </div>
    );
};