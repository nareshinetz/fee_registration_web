import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function NewPaymentPage() {
  const [form, setForm] = useState(() => {
    const editData = localStorage.getItem("editPayment");

    if (editData) {
      const parsed = JSON.parse(editData);
      localStorage.removeItem("editPayment");
      return parsed;
    }

    return {
      id: Date.now(),
      studentName: "",
      studentId: "",
      phone: "",
      collegeName: "",
      degree: "",
      customDegree: "",
      year: "",
      domain: "",
      subDomain: "",
      paymentMethod: "",
      amount: "",
      date: "",
      time: "",
      _editIndex: null
    };
  });

  const domains = ["Course", "Internship", "Project"];
  const subDomains = ["Java", "Python", "MERN", "IoT"];
  const paymentMethods = ["Cash", "GPay", "NEFT"];
  const degrees = ["BSc", "BTech", "MSc", "MTech", "Other"];
  const years = ["1", "2", "3", "4", "Degree Completed"];

  const handleSubmit = () => {
    if (!form.studentId || !form.amount) {
      alert("Please fill Student ID and Amount");
      return;
    }

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    const finalDegree =
      form.degree === "Other" ? form.customDegree : form.degree;

    const paymentData = {
      ...form,
      degree: finalDegree,
      date,
      time
    };

    const existingPayments = JSON.parse(
      localStorage.getItem("payments") || "[]"
    );

    if (form._editIndex !== null) {
      existingPayments[form._editIndex] = paymentData;
      alert("Payment updated successfully!");
    } else {
      existingPayments.push({
        ...paymentData,
        id: Date.now()
      });
      alert("Payment saved successfully!");
    }

    localStorage.setItem("payments", JSON.stringify(existingPayments));

    // Reset form
    setForm({
      id: Date.now(),
      studentName: "",
      studentId: "",
      phone: "",
      collegeName: "",
      degree: "",
      customDegree: "",
      year: "",
      domain: "",
      subDomain: "",
      paymentMethod: "",
      amount: "",
      date: "",
      time: "",
      _editIndex: null
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Sidebar />

      <div className="lg:ml-64 xl:ml-72">
        <Navbar />

        <main className="p-6 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              💰 New Payment
            </h1>

            <div className="bg-white rounded-xl shadow-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Student Name</label>
                  <input
                    value={form.studentName}
                    onChange={(e) =>
                      setForm({ ...form, studentName: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Student ID</label>
                  <input
                    value={form.studentId}
                    onChange={(e) =>
                      setForm({ ...form, studentId: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">College Name</label>
                  <input
                    value={form.collegeName}
                    onChange={(e) =>
                      setForm({ ...form, collegeName: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Degree</label>
                  <select
                    value={form.degree}
                    onChange={(e) =>
                      setForm({ ...form, degree: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select degree</option>
                    {degrees.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {form.degree === "Other" && (
                  <div>
                    <label className="block text-sm font-medium">
                      Enter Your Degree
                    </label>
                    <input
                      value={form.customDegree}
                      onChange={(e) =>
                        setForm({ ...form, customDegree: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium">Year</label>
                  <select
                    value={form.year}
                    onChange={(e) =>
                      setForm({ ...form, year: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Domain</label>
                  <select
                    value={form.domain}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        domain: e.target.value,
                        subDomain: ""
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select domain</option>
                    {domains.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {form.domain && (
                  <div>
                    <label className="block text-sm font-medium">
                      Sub Domain
                    </label>
                    <select
                      value={form.subDomain}
                      onChange={(e) =>
                        setForm({ ...form, subDomain: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="">Select sub domain</option>
                      {subDomains.map((sd) => (
                        <option key={sd} value={sd}>
                          {sd}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium">
                    Payment Method
                  </label>
                  <select
                    value={form.paymentMethod}
                    onChange={(e) =>
                      setForm({ ...form, paymentMethod: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select method</option>
                    {paymentMethods.map((pm) => (
                      <option key={pm} value={pm}>
                        {pm}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Amount</label>
                  <input
                    type="number"
                    value={form.amount}
                    onChange={(e) =>
                      setForm({ ...form, amount: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg"
                >
                  {form._editIndex !== null
                    ? "Update Payment"
                    : "Submit Payment"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
