import { useSelector } from "react-redux";
import { Footer } from "../components/Footer";
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";


const HomePage = () => {
  const [products, setProduct] = useState([])
  const [loading, setLoading] = useState(false); // Status loading
  const [error, setError] = useState(null); // Status error

  const userSelector = useSelector((state) => state.user)
  
  const fetchProducts = async () => {
    setLoading(true); // Mulai loading
    setError(null); // Reset error
    try {
      const response = await axiosInstance.get("/products")
      console.log(response.data)
      setProduct(response.data)
    } catch (err) {
      setError("Failed to fetch products");
      console.log(err); 
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  // fetch products data ketika pertama kali ngemount di home page
  useEffect(() => {
    fetchProducts()
  }, [])
  
  const productsList = products.map((isi, index) => {
      return (
        <ProductCard 
          key={index}
          imageUrl={isi.imageUrl}
          productName={isi.name}
          stock={isi.stock}
          price={isi.price}
          productId={isi.id}
          // discount={isi.price * (1 - isi.discount)}
          
        />
      )
    }
  )
      return (
        <>
          <main className='min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8'>
            <div className='pb-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
              <h1 className='text-4xl font-bold tracking-tighter text-gray-900 sm:text-6xl'>
                Become a trend-setter with us.
              </h1>
              <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
                We are a community of like-minded individuals who are passionate about
                creating a positive impact on the world.
    
              </p>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              {
                loading ? (
                  <div className="flex flex-col items-center justify-center min-h-screen">
                    <div className="relative w-48 h-48">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="spinner-border animate-spin inline-block w-16 h-16 border-b-2 border-gray-900 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  productsList
                )
              }
            </div>
          </main>
        </>
    );
}

export default HomePage;