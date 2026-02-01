import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getStudents, getTransactions } from "../api/api";


export default function Dashboard() {
    const [recentTransactions, setRecentTransactions] = useState([]);

    const [stats, setStats] = useState({
        totalStudents: 0,
        totalTransactions: 0,
        todayCollection: 0,
        totalFee: 0,
        pendingFee: 0,
        paidFee: 0,
    });

    useEffect(() => {
  const loadDashboard = async () => {
    const students = await getStudents();
    const payments = await getTransactions();

    // ---------- Stats ----------
    const totalStudents = students.length;
    const totalTransactions = payments.length;

    const today = new Date().toISOString().split("T")[0];

    const todayCollection = payments
      .filter(p => p.date === today)
      .reduce((sum, p) => sum + p.amount, 0);

    const totalFee = students.reduce(
      (sum, s) => sum + s.totalFee,
      0
    );

    const paidFee = payments.reduce(
      (sum, p) => sum + p.amount,
      0
    );

    const pendingFee = totalFee - paidFee;

    setStats({
      totalStudents,
      totalTransactions,
      todayCollection,
      totalFee,
      paidFee,
      pendingFee
    });

    // ---------- Recent Transactions ----------
    const enrichedTransactions = payments
      .map(p => {
        const student = students.find(s => s.id === p.id);
        return {
          id: p.id,
          name: student?.name || "Unknown",
          amount: p.amount,
          status: p.status,
          date: p.date
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    setRecentTransactions(enrichedTransactions);
  };

  loadDashboard();
}, []);



    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Sidebar />
            <div className="lg:ml-64 xl:ml-72">
                <Navbar />
                <main className="p-6 lg:p-8 -mt-0.5">
                    <div className="max-w-6xl mx-auto space-y-6">

                        {/* Header */}
                        <header className="flex items-start justify-between gap-4 pb-2">
                            <div className="flex-1">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                                    Dashboard
                                </h1>
                                <p className="text-sm text-gray-600">School fee management overview</p>
                            </div>
                        </header>

                        {/* Stats Grid - Fixed 2 rows */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

                            {/* 1. Students */}
                            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Students</p>
                                        <p className="text-xl font-bold text-gray-900 truncate">{stats.totalStudents}</p>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Transactions */}
                            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Transactions</p>
                                        <p className="text-xl font-bold text-gray-900 truncate">{stats.totalTransactions}</p>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Today */}
                            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Today</p>
                                        <p className="text-xl font-bold text-gray-900 truncate">₹{stats.todayCollection.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* 4. Total Fee */}
                            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Total Fee</p>
                                        <p className="text-xl font-bold text-gray-900 truncate">₹{stats.totalFee.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* 5. Pending */}
                            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Pending</p>
                                        <p className="text-xl font-bold text-gray-900 truncate">₹{stats.pendingFee.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Charts - Fixed Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Fee Progress */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    Fee Status
                                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">72% Paid</span>
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Paid</span>
                                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                                            <div className="h-2 bg-emerald-500 rounded-full" style={{ width: '72%' }} />
                                        </div>
                                        <span className="font-semibold text-emerald-600">₹178K</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Pending</span>
                                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                                            <div className="h-2 bg-orange-500 rounded-full" style={{ width: '28%' }} />
                                        </div>
                                        <span className="font-semibold text-orange-600">₹67K</span>
                                    </div>
                                </div>
                            </div>

                            {/* Mini Chart */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Collections Trend</h3>
                                <div className="grid grid-cols-5 gap-1 h-16 items-end">
                                    {[
                                        { h: '30%', c: 'bg-blue-400' },
                                        { h: '70%', c: 'bg-emerald-400' },
                                        { h: '90%', c: 'bg-indigo-400' },
                                        { h: '50%', c: 'bg-purple-400' },
                                        { h: '80%', c: 'bg-orange-400' },
                                    ].map((bar, i) => (
                                        <div
                                            key={i}
                                            className={`rounded ${bar.c} hover:scale-105 transition-all cursor-pointer mx-0.5`}
                                            style={{ height: bar.h }}
                                        />
                                    ))}
                                </div>
                                <div className="grid grid-cols-5 gap-1 mt-2 text-xs text-gray-500 text-center">
                                    <span>1</span><span>8</span><span>15</span><span>22</span><span>29</span>
                                </div>
                            </div>
                        </div>

                        {/* Table - Fixed Widths */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm">
                            <div className="flex justify-between items-center mb-5">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                                <a href="#" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">View All →</a>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="py-3 pl-4 pr-2 text-left font-semibold text-gray-700 w-3/5">Student</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700 w-1/5">Amount</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700 w-1/10">Status</th>
                                            <th className="py-3 pr-4 text-left font-semibold text-gray-700 w-1/10">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
  {recentTransactions.map((t) => (
    <tr key={t.id} className="hover:bg-gray-50 cursor-pointer">
      <td className="py-3 pl-4 pr-2 font-medium text-gray-900">
        {t.name}
      </td>

      <td className="py-3 px-4 font-bold text-emerald-600">
        ₹{t.amount.toLocaleString()}
      </td>

      <td className="py-3 px-4">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
            t.status === "paid"
              ? "bg-emerald-100 text-emerald-800"
              : "bg-orange-100 text-orange-800"
          }`}
        >
          {t.status.toUpperCase()}
        </span>
      </td>

      <td className="py-3 pr-4 text-gray-600">
        {new Date(t.date).toLocaleDateString()}
      </td>
    </tr>
  ))}
</tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}










