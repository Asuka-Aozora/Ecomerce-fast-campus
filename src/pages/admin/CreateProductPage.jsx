import AdminLayout from "@/components/layout/AdminLayout"
import { axiosInstance } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductForm from "@/components/layout/forms/ProductForm";
import { useDelay } from "@/components/DelayContext";


const CreateProductPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const { simulateDelay } = useDelay();

  const handleCreateProduct = async (values) => {
    setLoading(true);
    try {
      await simulateDelay(2000);
      await axiosInstance.post("/products", values);

      alert("Product created")
      navigate("/admin/products")
    } catch (err) {
      console.log(err);
      alert("Failed to create product");
    } finally {
      setLoading(false)
    }
  };

  return (
      <AdminLayout title="Create Products" description="Add new products">
          <ProductForm
           cardTitle="Add a new product"
           onSubmit={handleCreateProduct}
           loading={loading}
          />
      </AdminLayout>
  )
}

export default CreateProductPage

