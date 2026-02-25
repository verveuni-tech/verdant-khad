import { memo, useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";

const Navbar = memo(function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Top Row */}
        <div className="h-16 md:h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="text-xl md:text-2xl font-semibold text-brand-brown">
            OrganicKhad
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 mx-10">
            <div className="flex w-full max-w-2xl">
              <input
                type="text"
                placeholder="Search compost, vermicompost, neem khali..."
                className="
                  w-full
                  px-5 py-3
                  rounded-l-xl
                  border border-gray-300
                  focus:outline-none
                  focus:ring-2
                  focus:ring-green-500
                  focus:border-green-500
                "
              />
              <button
                className="
                  px-6
                  bg-green-600
                  text-white
                  font-medium
                  rounded-r-xl
                  hover:bg-green-700
                  transition
                "
              >
                Search
              </button>
            </div>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <button className="hover:text-brand-brown transition">
              Orders
            </button>

         

            <button className="bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 transition">
             Cart
            </button>
          </div>

          {/* Mobile Right */}
          <div className="md:hidden flex items-center gap-4">
            <ShoppingCart size={22} className="text-gray-700" />

            <button onClick={() => setOpen(!open)}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="
                w-full
                px-4 py-2
                rounded-l-lg
                border border-gray-300
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />
            <button className="px-4 bg-green-600 text-white rounded-r-lg">
              Go
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {open && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4 text-sm font-medium text-gray-700">
            <button className="block w-full text-left px-2">
              Orders
            </button>

           
            <button className="w-full bg-green-600 text-white py-2 rounded-lg">
              Cart
            </button>
          </div>
        )}

      </div>
    </header>
  );
});

export default Navbar;