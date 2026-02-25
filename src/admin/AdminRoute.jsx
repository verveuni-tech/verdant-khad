import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setStatus("unauthorized");
        return;
      }

      try {
        // DO NOT force refresh every time in production
        const token = await user.getIdTokenResult();

        if (token.claims.admin === true) {
          setStatus("authorized");
        } else {
          setStatus("unauthorized");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setStatus("unauthorized");
      }
    });

    return unsubscribe;
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Verifying access...
      </div>
    );
  }

  if (status === "unauthorized") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}