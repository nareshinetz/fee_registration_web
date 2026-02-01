import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Students from "./Pages/Students";
import NewPayment from "./Pages/NewPayment";
import Transactions from "./Pages/TransactionHistory";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={
          <Dashboard />
        } />

        <Route path="/students" element={
          <ProtectedRoute><Students /></ProtectedRoute>
        } />

        <Route path="/new-payment" element={
          <ProtectedRoute><NewPayment /></ProtectedRoute>
        } />

        <Route path="/transactions" element={
          <ProtectedRoute><Transactions /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
