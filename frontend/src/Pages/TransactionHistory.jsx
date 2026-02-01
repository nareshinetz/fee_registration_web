import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Transactions() {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(stored);
  }, []);

  const handleDelete = (index) => {
    if (!window.confirm("Are you sure?")) return;

    const updated = payments.filter((_, i) => i !== index);
    localStorage.setItem("payments", JSON.stringify(updated));
    setPayments(updated);
  };

  const handleEdit = (payment, index) => {
    localStorage.setItem(
      "editPayment",
      JSON.stringify({ ...payment, _editIndex: index })
    );
    navigate("/new-payment");
  };

  const filteredData = payments.filter((p) => {
  const matchSearch =
    p.studentName?.toLowerCase().includes(search.toLowerCase()) ||
    p.paymentMethod?.toLowerCase().includes(search.toLowerCase());

  const matchFilter =
    filter === "All" || p.paymentMethod === filter;

  return matchSearch && matchFilter;
});


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      <div className="lg:ml-64 xl:ml-72">
        <Navbar />

        <main className="p-6">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-4">
              📄 Transaction History
            </h1>

            <div className="flex gap-4 mb-4">
              <input
                placeholder="Search by Name or Mode..."
                className="w-full px-4 py-2 border rounded-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className="px-3 py-2 border rounded-lg"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Cash">Cash</option>
                <option value="GPay">GPay</option>
                <option value="NEFT">NEFT</option>
              </select>
            </div>

            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full border-collapse">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-3">Student ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Mode</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Time</th>
                    <th className="p-3">Domain</th>
                    <th className="p-3">Sub Domain</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center p-4">
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    paginatedData.map((p, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3">{p.studentId}</td>
                        <td className="p-3">{p.studentName || "-"}</td>
                        <td className="p-3">₹{p.amount}</td>
                        <td className="p-3">{p.paymentMethod}</td>
                        <td className="p-3">{p.date}</td>
                        <td className="p-3">{p.time}</td>
                        <td className="p-3">{p.domain}</td>
                        <td className="p-3">{p.subDomain}</td>

                        <td className="p-3 text-center space-x-2">
                          <button
                            onClick={() => handleEdit(p, index)}
                            className="px-3 py-1 bg-yellow-500 text-white rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(index)}
                            className="px-3 py-1 bg-red-500 text-white rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Prev
              </button>

              <span>
                Page {currentPage} of {totalPages || 1}
              </span>

              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
