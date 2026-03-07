import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
      );

      localStorage.setItem("user", JSON.stringify(data));

      toast.success("Login successful ✅");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT IMAGE SECTION */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')",
        }}
      >
        <div className="bg-black/40 w-full flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold text-center px-10">
            Smart Notes <br /> Collaboration Platform
          </h1>
        </div>
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-blue-50 px-6">
        <div className="w-full max-w-md">
          {/* APP TITLE OUTSIDE CARD */}
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Smart Notes Manager
          </h1>

          {/* LOGIN CARD */}
          <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
              Login to your account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition shadow-md"
              >
                Login
              </button>
            </form>

            <p className="text-sm text-center mt-5 text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 hover:underline font-medium"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
