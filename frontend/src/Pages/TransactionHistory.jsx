import { useEffect, useState } from "react";
import { getTransactions } from "../api/api";

export default function Transactions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTransactions().then(setData);
  }, []);

  return (
    <div>
      <h2>Transaction History</h2>
      {data.map(tx => (
        <div key={tx.id}>
          {tx.studentId} | ₹{tx.amount} | {tx.paymentMode}
        </div>
      ))}
    </div>
  );
}
