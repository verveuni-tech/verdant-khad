import { useEffect, useState, useMemo, useCallback } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import {
  Package,
  ShoppingCart,
  Users,
  AlertTriangle,
} from "lucide-react";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);

      const productsRef = collection(db, "products");
      const bookingsRef = collection(db, "bookings");
      const usersRef = collection(db, "users");

      const recentBookingsQuery = query(
        bookingsRef,
        orderBy("createdAt", "desc"),
        limit(5)
      );

      const [
        productsSnap,
        bookingsSnap,
        usersSnap,
        recentBookingsSnap,
      ] = await Promise.all([
        getDocs(productsRef),
        getDocs(bookingsRef),
        getDocs(usersRef),
        getDocs(recentBookingsQuery),
      ]);

      setProducts(productsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setBookings(bookingsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setUsers(usersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setRecentBookings(
        recentBookingsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const lowStockProducts = useMemo(() => {
    return products.filter(
      (p) => (p.stock || 0) - (p.reservedStock || 0) < 10
    );
  }, [products]);

  const totalRevenue = useMemo(() => {
    return bookings.reduce((acc, b) => acc + (b.totalAmount || 0), 0);
  }, [bookings]);

  if (loading) return <DashboardSkeleton />;

  if (error)
    return (
      <div className="p-10 text-red-400 font-medium">
        {error}
      </div>
    );

  return (
    <div className="p-6 md:p-10 text-gray-100">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-1">
            Overview of platform performance
          </p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          <StatCard title="Products" value={products.length} icon={<Package size={18} />} />
          <StatCard title="Bookings" value={bookings.length} icon={<ShoppingCart size={18} />} />
          <StatCard title="Users" value={users.length} icon={<Users size={18} />} />
          <StatCard title="Low Stock" value={lowStockProducts.length} icon={<AlertTriangle size={18} />} danger />
        </div>

        {/* Revenue */}
        <Card title="Total Revenue" className="mb-12">
          <p className="text-3xl font-bold text-emerald-400">
            ₹ {totalRevenue.toLocaleString()}
          </p>
        </Card>

        {/* Recent Bookings */}
        <Card title="Recent Bookings">
          {recentBookings.length === 0 ? (
            <EmptyState text="No bookings yet." />
          ) : (
            <div className="divide-y divide-[#1E293B]">
              {recentBookings.map((booking) => (
                <BookingRow key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </Card>

        {/* Low Stock */}
        <Card title="Low Stock Products" className="mt-10">
          {lowStockProducts.length === 0 ? (
            <EmptyState text="All products sufficiently stocked." />
          ) : (
            <div className="divide-y divide-[#1E293B]">
              {lowStockProducts.map((product) => (
                <LowStockRow key={product.id} product={product} />
              ))}
            </div>
          )}
        </Card>

      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, icon, danger }) {
  return (
    <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className={`text-2xl font-semibold mt-1 ${danger ? "text-red-400" : "text-gray-100"}`}>
          {value}
        </p>
      </div>
      <div className={`p-3 rounded-xl ${danger ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"}`}>
        {icon}
      </div>
    </div>
  );
}

function Card({ title, children, className = "" }) {
  return (
    <div className={`bg-[#111827] border border-[#1E293B] rounded-2xl p-6 ${className}`}>
      <h2 className="text-lg font-semibold mb-6 text-gray-200">
        {title}
      </h2>
      {children}
    </div>
  );
}

function BookingRow({ booking }) {
  return (
    <div className="py-4 flex justify-between items-center">
      <div>
        <p className="font-medium text-gray-100">
          {booking.bookingNumber || booking.id}
        </p>
        <StatusBadge status={booking.status} />
      </div>
      <div className="text-right text-sm text-gray-400">
        <p>Qty: {booking.quantity}</p>
        <p>₹ {booking.totalAmount || 0}</p>
      </div>
    </div>
  );
}

function LowStockRow({ product }) {
  const available =
    (product.stock || 0) - (product.reservedStock || 0);

  return (
    <div className="py-4 flex justify-between items-center">
      <p className="font-medium text-gray-100">
        {product.title}
      </p>
      <span className="text-sm font-medium text-red-400">
        {available} left
      </span>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending: "bg-yellow-500/20 text-yellow-400",
    confirmed: "bg-emerald-500/20 text-emerald-400",
    cancelled: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`inline-block text-xs px-3 py-1 rounded-full mt-1 ${
        map[status] || "bg-gray-600/20 text-gray-400"
      }`}
    >
      {status || "unknown"}
    </span>
  );
}

function EmptyState({ text }) {
  return (
    <p className="text-gray-400 text-sm">{text}</p>
  );
}

function DashboardSkeleton() {
  return (
    <div className="p-10 animate-pulse">
      <div className="h-8 w-64 bg-[#1E293B] rounded mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-[#1E293B] h-28 rounded-2xl" />
        ))}
      </div>
      <div className="bg-[#1E293B] h-40 rounded-2xl mb-10" />
      <div className="bg-[#1E293B] h-40 rounded-2xl" />
    </div>
  );
}