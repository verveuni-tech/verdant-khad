import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    setLoading(true);

    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdTokenResult(true);

    console.log("LOGIN CLAIMS:", token.claims);

    if (token.claims.admin === true) {
      navigate("/admin/dashboard");
    } else {
      alert("You are not an admin.");
      await auth.signOut();
    }

  } catch (error) {
    console.error(error);
    alert("Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Admin Login
        </h2>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>

      </div>
    </div>
  );
}