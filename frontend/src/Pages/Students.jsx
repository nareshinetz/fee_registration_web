import { useState,  } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function StudentsPage() {
  // ---------- State ----------
  const [students, setStudents] = useState([
    { id: 1, name: "Arun", email: "arun@gmail.com", phone: "9876543210", status: "Completed" },
    { id: 2, name: "Priya", email: "priya@gmail.com", phone: "9123456780", status: "Pending" },
    { id: 3, name: "Karthick", email: "karthick@gmail.com", phone: "9988776655", status: "Completed" },
    { id: 4, name: "Meena", email: "meena@gmail.com", phone: "9000000000", status: "Pending" },
    { id: 5, name: "Ramesh", email: "ramesh@gmail.com", phone: "9876501234", status: "Completed" },
    { id: 6, name: "Sita", email: "sita@gmail.com", phone: "9123409876", status: "Pending" },
    { id: 7, name: "Vikram", email: "vikram@gmail.com", phone: "9988774455", status: "Completed" },
    { id: 8, name: "Anita", email: "anita@gmail.com", phone: "9000098765", status: "Pending" },
    { id: 9, name: "Rahul", email: "rahul@gmail.com", phone: "9876123456", status: "Completed" },
    { id: 10, name: "Nisha", email: "nisha@gmail.com", phone: "9123450000", status: "Pending" },
  ]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7; // students per page

  // ---------- Filtered Students ----------
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  // ---------- Pagination ----------
  const totalPages = Math.ceil(filteredStudents.length / pageSize);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-64 xl:ml-72">
        <Navbar />

        <main className="p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* Header + Search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                🎓 Students Management
              </h1>

              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); // reset page when searching
                }}
                className="mt-3 md:mt-0 w-full md:w-80 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-xl shadow-xl p-6 overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Student</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedStudents.length > 0 ? (
                    paginatedStudents.map((s, index) => (
                      <tr
                        key={s.id}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-blue-50 transition`}
                      >
                        <td className="px-4 py-3 font-medium">{s.id}</td>
                        <td className="px-4 py-3 font-semibold">{s.name}</td>
                        <td className="px-4 py-3 text-gray-600">{s.email}</td>
                        <td className="px-4 py-3">{s.phone}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              s.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-gray-500">
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="flex justify-between items-center mt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Prev
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}




















