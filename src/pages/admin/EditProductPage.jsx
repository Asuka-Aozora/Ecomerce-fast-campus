import { useDelay } from "@/components/DelayContext"
import AdminLayout from "@/components/layout/AdminLayout"
import ProductForm from "@/components/layout/forms/ProductForm"
import { axiosInstance } from "@/lib/axios"
import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const EditProductPage = () => {
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState(null)
  const { productId } = useParams()
  const navigate = useNavigate()
  const { simulateDelay } = useDelay();
  console.log("ID from URL:", productId);

  const fetchProduct = async () => { 
    try {
      console.log("Request ke URL:", `/products/${productId}`);
      const response = await axiosInstance.get(`/products/${productId}`)
      setProduct(response.data)
      console.log(response.data);
    } catch (error) {
      console.error("error fetching product",error);
    } 
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  const {discount, imageUrl, name, price, stock} = product ?? {}


  const handleEditProduct = async (values) => {
    setLoading(true)
    try {
      await simulateDelay(2000);
      await axiosInstance.patch(`/products/${productId}`, values);
      alert("Product edited")
      navigate("/admin/products")
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  };
  

  return (
    <AdminLayout title="Edit Product" description="Editing product">
      {product?.id ? (
      <ProductForm
        cardTitle={`Editing ${name}`}
        onSubmit={handleEditProduct}
        loading={loading}
        defaultName={name}
        defaultPrice={price}
        defaultStock={stock}
        defaultImageUrl={imageUrl}
      />
    ) : (
      <div className="text-center text-gray-500">Product not found</div>
    )}
    </AdminLayout>
  )
}

export default EditProductPage
