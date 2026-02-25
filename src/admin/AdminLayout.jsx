// admin/AdminLayout.jsx

import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { auth } from "../firebase";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Package,
  Layers,
} from "lucide-react";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <div className="h-screen flex bg-[#0F172A] text-gray-100 overflow-hidden">

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#111827] border-r border-[#1E293B] flex-col">
        <Sidebar handleLogout={handleLogout} />
      </aside>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-64 h-full bg-[#111827] p-6 flex flex-col">
            <MobileSidebar
              closeDrawer={() => setOpen(false)}
              handleLogout={handleLogout}
            />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <header className="h-16 px-6 flex items-center justify-between bg-[#111827] border-b border-[#1E293B]">
          <button
            className="lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>

          <h1 className="font-semibold text-gray-200">
            Admin Panel
          </h1>

          <button
            onClick={handleLogout}
            className="hidden lg:flex items-center gap-2 text-sm text-red-400 hover:text-red-500"
          >
            <LogOut size={16} />
            Logout
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#0F172A]">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

/* ---------- Sidebar ---------- */

function Sidebar({ handleLogout }) {
  return (
    <>
      <div className="h-16 flex items-center px-6 border-b border-[#1E293B] font-semibold text-lg">
        Admin
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <AdminLink
          to="/admin/dashboard"
          label="Dashboard"
          icon={<LayoutDashboard size={18} />}
        />
        <AdminLink
          to="/admin/products/create"
          label="Create Products"
          icon={<Package size={18} />}
        />
        <AdminLink
          to="/admin/categories"
          label="Categories"
          icon={<Layers size={18} />}
        />
         <AdminLink
          to="/admin/products"
          label="Manage Products"
          icon={<Layers size={18} />}
        />
       
      </nav>

    
    </>
  );
}

function MobileSidebar({ closeDrawer, handleLogout }) {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-semibold">Admin</h2>
        <button onClick={closeDrawer}>
          <X size={22} />
        </button>
      </div>

      <nav className="space-y-4">
        <AdminLink to="/admin/dashboard" label="Dashboard" onClick={closeDrawer} />
        <AdminLink to="/admin/products" label="Products" onClick={closeDrawer} />
        <AdminLink to="/admin/categories" label="Categories" onClick={closeDrawer} />
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto bg-red-600 py-2 rounded-lg"
      >
        Logout
      </button>
    </>
  );
}

function AdminLink({ to, label, icon, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
          isActive
            ? "bg-emerald-600 text-white"
            : "text-gray-400 hover:bg-[#1F2937] hover:text-gray-200"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}