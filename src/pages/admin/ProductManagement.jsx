import { AdminPage } from '@/components/guard/AdminPage'
import AdminLayout from '@/components/layout/AdminLayout'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { axiosInstance } from '@/lib/axios'
import { ChevronLeft, ChevronRight, Edit, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const ProductManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [productName, setProductName] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState([])
  
  const handleNextPage = () => {
    const currentPage = Number(searchParams.get("page")) || 1; 
    const nextPage = validatePage(currentPage + 1);
    searchParams.set("page", nextPage); 
    setSearchParams(searchParams);
  };
  
  const handlePreviousPage = () => {
    const currentPage = Number(searchParams.get("page")) || 1; 
    const prevPage = validatePage(currentPage - 1); 
    searchParams.set("page", prevPage); 
    setSearchParams(searchParams);
  };
  
  const handleDeleteProduct = async () => {
    const shouldDelete = confirm(`Are you sure you want to delete ${selectedProductIds.length} product?`)
    
    if (!shouldDelete) return;

    const deletePromises = selectedProductIds.map((productId) => {
      return axiosInstance.delete(`/products/${productId}`)
    })

    try {
      await Promise.all(deletePromises)
      alert(`Successfully deleted ${selectedProductIds.length} products!`)
       
      searchParams.set("page", 1); 
      setSearchParams(searchParams);
      setSelectedProductIds([])
    } catch (err) {
      console.log(err);
      
    }
  }
  
  const validatePage = (page) => {
    if (page < 1) return 1; 
    if (page > totalPages) return totalPages;
    return page; 
  };
  
  const fetchProducts = async (page, search) => {
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          _per_page: 5,
          _page: page,
          name: search || undefined,
          // name: searchParams.get("product_name"), // kalau ini kosong, dia akan gak nge-filter by name
        }
      })
      
      setHasNextPage(Boolean(response.data.next))
      setTotalPages(response.data.pages || 1);
      setProducts(response.data.data)
    } catch (err) {
      console.log(err);
      
    }
  }

  const searchProduct = () => {
    if (productName) {
      searchParams.set("product_name", productName)
      setSearchParams(searchParams)
    } else {
      searchParams.delete("product_name")
      setSearchParams(searchParams)
    }
  }

  const handleOnCheckedProduct = (productId,checked) => {
    if (checked) {
    //  versi panjang:
      // const prevSelectedProductIds = [...selectedProductIds];
      // prevSelectedProductIds.push(productId)

      // setSelectedProductIds(prevSelectedProductIds)

    //  Alternatif pendek:
     setSelectedProductIds([ ...selectedProductIds, productId]) 
    } else {
    //  versi panjang:
      // const productIdIndex =  selectedProductIds.findIndex(id => {
      //   return id == productId;
      // });

      // const prevSelectedProductIds = [...selectedProductIds];
      // prevSelectedProductIds.splice(productIdIndex, 1)

      // setSelectedProductIds(prevSelectedProductIds)

    //  Alternatif pendek:
      setSelectedProductIds(
        selectedProductIds.filter((id) => id !== productId)
      );

    }
  }

  useEffect(() => {
    const page = validatePage(Number(searchParams.get("page")));
    const search = searchParams.get("product_name");

    if (page > totalPages) {
      searchParams.set("page", totalPages);
      setSearchParams(searchParams);
    } else if (page !== Number(searchParams.get("page"))) {
      searchParams.set("page", page);
      setSearchParams(searchParams);
    } else {
      fetchProducts(page, search);
    }
  }, [searchParams, totalPages]);
  

  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams({ page: 1})
    } 
  }, [])

  useEffect(() => {
    console.log(selectedProductIds);
  }, [selectedProductIds])

  

  return (
    <AdminPage>
      <AdminLayout
        title="Product Management"
        description="Managing our products"
        rightSection={
          <div className='flex gap-2'>
            {
              selectedProductIds.length ? (
                <Button variant="destructive" onClick={handleDeleteProduct}>
                  Delete {selectedProductIds.length} Products
                </Button>
              ) : null}

            <Link to="/admin/products/create">
              <Button>
                <IoAdd className='h-6 w-6 mr-2'/>
                Add Product
              </Button>
            </Link>
          </div>
        }
      >
        <div className='mb-8'>
          <Label>Search Product Name</Label>
          <div className='flex gap-4'>
            <Input
             value={productName}
             onChange={e => setProductName(e.target.value)}
             className="max-w-[400px]"
             placeholder="Search products..."
            />
            <Button onClick={searchProduct}>Search</Button>
          </div>
        </div>
        <Table className="p-4 border rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox onCheckedChange={(checked) =>
                       handleOnCheckedProduct(product.id, checked)
                      }
                      checked={selectedProductIds.includes(product.id)}
                    />
                  </TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>Rp {(product.price).toLocaleString("id-ID")}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                      <Link to={"/admin/products/edit/" + product.id}>
                        <Button variant="ghost" size="icon">
                          <Edit className='w-6 h-6'/>
                        </Button>
                      </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <Button
               disabled={searchParams.get("page") == 1}
               onClick={handlePreviousPage}
               variant="ghost"
              >
                <ChevronLeft className='w-6 h-6 mr-2'/> Previous
              </Button>
            </PaginationItem>

            <PaginationItem className="mx-8 font-semibold   ">
              Page {searchParams.get("page")}
            </PaginationItem>

            <PaginationItem>
              <Button
               disabled={!hasNextPage}
               onClick={handleNextPage}
               variant="ghost"
              >
                 Next <ChevronRight className='w-6 h-6 ml-2'/>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </AdminLayout>
    </AdminPage>
  )
}

export default ProductManagement
