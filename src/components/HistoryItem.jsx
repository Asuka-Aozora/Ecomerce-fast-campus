import { Link } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { Button } from "./ui/button";

export const HistoryItem = ({
  transactionDate,
  id,
  totalPrice,
  tax,
  items,
}) => {
  return (
    <div>
      <div className="rounded-md p-4 bg-slate-50 flex justify-between items-center">
        <div className="flex flex-col justify-center">
          <span className="text-muted-foreground text-sm">
            {transactionDate}
          </span>
          <span className="text-muted-foreground font-semibold">INV-{id}</span>
        </div>

        <div className="flex flex-col justify-center items-end">
          <span className="text-2xl font-bold">
            Rp {(totalPrice + tax).toLocaleString("id-ID")}
          </span>

          <Link to={`/history/${id}`}>
            <Button variant="link">
              View Details
            </Button>
          </Link>
        </div>
      </div>

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
              <TableCell>Rp {product.price.toLocaleString("id-ID")}</TableCell>
              <TableCell>{quantity}</TableCell>
              <TableCell>
                Rp {(product.price * quantity).toLocaleString("id-ID")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
