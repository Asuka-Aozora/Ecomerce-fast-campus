import { LoggedIn } from "@/components/guard/LoggedinPage";
import { HistoryItem } from "@/components/HistoryItem";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const HistoryPage = () => {
  const [transactions, setTransactions] = useState([]);

  const userSelector = useSelector((state) => state.user);

  const fetchTransactionHistory = async () => {
    try {
      const historyResponse = await axiosInstance.get("/transactions", {
        params: {
          userId: userSelector.id,
        },
      });

      setTransactions(historyResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  return (
    <LoggedIn>
      <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">My Orders</h1>

        <div className="flex flex-col mt-8 gap-24">
          {transactions.map((transactions) => {
            return (
              <HistoryItem
                key={transactions.id}
                id={transactions.id}
                totalPrice={transactions.totalPrice}
                tax={transactions.tax}
                transactionDate={format(
                  new Date(transactions.transactionDate),
                  "dd MMM yyyy"
                )}
                items={transactions.items}
              />
            );
          })}
        </div>
      </main>
    </LoggedIn>
  );
};

export default HistoryPage;
