import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    await login(email, password); // wait for API
    navigate("/dashboard");
  } catch (err) {
    alert(err.message || "Invalid login");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-6"> {/* Smaller max-w */}
        {/* Branding/Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mb-4"> {/* Smaller logo */}
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight"> {/* Smaller title */}
            Welcome Back
          </h2>
          <p className="mt-1 text-xs text-gray-500"> {/* Smaller text */}
            Sign in to continue
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl border border-white/50 p-8 transform hover:-translate-y-0.5 transition-all duration-300"> {/* Smaller padding/shadow */}
          <form onSubmit={handleSubmit} className="space-y-4"> {/* Tighter spacing */}
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2"> {/* Smaller margin */}
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-gradient-to-r from-slate-50 to-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-transparent transition-all duration-300 text-base placeholder-gray-400" /* Smaller padding/font */
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none pt-1">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17M6.839 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-3.172M16.5 19.5l2.147 2.147M12 11a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-gradient-to-r from-slate-50 to-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-transparent transition-all duration-300 text-base placeholder-gray-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-3 px-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500/30" /* Smaller button */
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-4 h-4 mr-1.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                </svg>
                Sign In
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 leading-tight"> {/* Smaller text */}
                Frontend demo login (no backend yet)
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
