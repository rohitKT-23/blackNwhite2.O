import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("isLogin", true);
        navigate("/home");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full blur-3xl opacity-20 -top-48 -left-48 animate-float"></div>
        <div className="absolute w-96 h-96 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full blur-3xl opacity-20 -bottom-48 -right-48 animate-float-delayed"></div>
      </div>

      <div className="relative z-10 bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl w-full max-w-md space-y-8 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-400">Please sign in to continue</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400 transition-all duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400 transition-all duration-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-gray-400">
          Not registered?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
          >
            Create account
          </button>
        </p>
      </div>

      <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float 8s ease-in-out infinite 2s;
                }
            `}</style>
    </div>
  );
};

export default Login;