import { useState } from "react";
import { createPayment } from "../api/api";

export default function NewPayment() {
  const [form, setForm] = useState({
    studentId: "",
    amount: ""
  });

  const handleSubmit = async () => {
    await createPayment({
      ...form,
      paymentMode: "CASH"
    });
    alert("Payment recorded");
  };

  return (
    <div>
      <h2>New Payment (Cash)</h2>

      <input
        placeholder="Student ID"
        onChange={e => setForm({ ...form, studentId: e.target.value })}
      />

      <input
        placeholder="Amount"
        onChange={e => setForm({ ...form, amount: e.target.value })}
      />

      <button onClick={handleSubmit}>Save Payment</button>
    </div>
  );
}
