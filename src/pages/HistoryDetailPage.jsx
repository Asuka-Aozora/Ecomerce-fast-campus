import { LoggedIn } from "@/components/guard/LoggedinPage";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { TableBody, TableCell } from "@/components/ui/table";
import { Table, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const HistoryDetailPage = () => {
  const { transactionId } = useParams();
  const userSelector = useSelector((state) => state.user);
  const [historyDetail, setHistoryDetail] = useState(null);

  const fetchHistoryDetail = async () => {
    try {
      console.log("Request ke URL:", `/transactions/${transactionId}`);
      const response = await axiosInstance.get(
        `/transactions/${transactionId}`
      );
      console.log("Full Response:", response);
      setHistoryDetail(response.data);
    } catch (err) {
      console.error("Error fetching history detail:", err);
      if (err.response) {
        console.error("Server responded with status:", err.response.status);
        console.error("Response data:", err.response.data);
      } else if (err.request) {
        console.error("No response received from server:", err.request);
      } else {
        console.error("Error message:", err.message);
      }
    } finally {
      setTimeout(() => setLoading(false), 500); // Adding timeout for loading state
    }
  };

  useEffect(() => {
    fetchHistoryDetail();
  }, []);

  if (!historyDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen max-w-screen-lg mx-auto">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-b-2 border-gray-900 rounded-full"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const { id, userId, totalPrice, tax, transactionDate, items } = historyDetail;
  
  if (userSelector.id !== userId) {
    return <Navigate to="/" />;
  }


  return (
    <LoggedIn>
      <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-10">
        <h1 className="text-3xl font-bold">INV-{id}</h1>
        <h2 className="text-xl font-bold">
          {format(new Date(transactionDate), "dd MMM yyyy")}
        </h2>

        <Card className="col-span-5 bg-gray-50 border-0 my-8">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex pb-4 justify-between border-b">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex py-4 justify-between border-b">
              <span className="text-sm text-muted-foreground">Taxes (10%)</span>
              <span>Rp {tax.toLocaleString("id-ID")}</span>
            </div>
          </CardContent>
          <CardFooter className="flex-col flex gap-6">
            <div className="flex justify-between w-full">
              <span className="font-semibold text-muted-foreground">Total</span>
              <span className="font-semibold">
                Rp {(totalPrice + tax).toLocaleString("id-ID")}
              </span>
            </div>
          </CardFooter>
        </Card>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={2}>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(({ product, quantity }) => (
              <TableRow
                key={product.id}
                className="text-muted-foreground font-semibold"
              >
                <TableCell colSpan={2}>
                  <div className="flex items-center gap-6">
                    <div className="aspect-square w-[100px] overflow-hidden rounded-md">
                      <img src={product.imageUrl} alt={product.name} />
                    </div>
                    <p className="font-semibold text-primary">{product.name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  Rp {product.price.toLocaleString("id-ID")}
                </TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell>
                  Rp {(product.price * quantity).toLocaleString("id-ID")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </LoggedIn>
  );
};

export default HistoryDetailPage;
