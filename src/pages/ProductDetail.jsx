import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import { IoIosRemove, IoIosAdd } from 'react-icons/io';
import { IoHeartOutline } from 'react-icons/io5';
import { useParams } from "react-router-dom";
import { axiosInstance } from '@/lib/axios';
import { Skeleton } from '@/components/ui/skeleton';

const ProductDetail = () => {
  const [productData, setProductCard] = useState(null)
  const [loading, setLoading] = useState(true)
  const { productId } = useParams();
  console.log("ID from URL:", productId);

  useEffect(() => {
    const fetchProduct = async () => { 
      try {
        setLoading(true)
        console.log("Request ke URL:", `/products/${productId}`);
        const response = await axiosInstance.get(`/products/${productId}`)
        setProductCard(response.data)
        console.log(response);
      } catch (error) {
        console.error("error fetching product",error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    }

    fetchProduct()
  }, [productId])

  // if (loading) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-screen">
  //       <div className="relative w-48 h-48">
  //         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  //           <div className="spinner-border animate-spin inline-block w-16 h-16 border-b-2 border-gray-900 rounded-full"></div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  

  if (!productData) { 
    return <h1 className="text-center text-white">Loading product...</h1>;
  }

  const {discount, imageUrl, name, price, stock} = productData

  // const [quantity, setQuantity] = useState(0)

  return (
    <main className='min-h-screen max-w-screen-lg mx-auto px-4 mt-8'>
      <div className='grid grid-cols-2 gap-8'>
        {loading ? (
            <Skeleton className='w-full h-[582px]'/>
        ) : (
        <img src={imageUrl} alt={name} className='w-full' />
        )}

        <div className='flex flex-col gap-1 justify-center'>
          {loading ? (
            <Skeleton className='w-[230px] h-[28px]'/>
          ) : (
          <h1 className='text-xl'>{name}</h1>
          )}

          {loading ? (
            <Skeleton className='w-[340px] h-[45px]'/>
          ) : (
          <h3 className='text-3xl font-bold'>Rp {Number(price).toLocaleString('id-ID')}</h3>
          )}
          
          {loading ? (
            <Skeleton className='w-[340px] h-[110px] mt-4'/>
          ) : (
            <p className='text-sm text-muted-foreground mt-4'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis nisi,
              unde cupiditate praesentium consequuntur in ab perferendis architecto perspiciatis,
              sint iure id. Expedita, nesciunt magnam.
            </p>
          )}

          <div className='flex items-center gap-8 mt-6'>
            <Button
              size="icon"
              variant="ghost">
              <IoIosRemove className="h-6 w-6" />
            </Button>

            <p className="text-lg font-bold">0</p>

            <Button
              size="icon"
              variant="ghost">
              <IoIosAdd className="h-6 w-6" />
            </Button>
          </div>

          <div className='flex items-center mt-4 gap-4'>
            <Button className="w-full" size="lg">
              Add to cart
            </Button>
            <Button size="icon" variant="ghost">
              <IoHeartOutline className='h-6 w-6'/>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetail
