import { memo } from "react";

const Navbar = memo(function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

        {/* LEFT: Logo */}
        <div className="text-2xl font-semibold text-brand-brown">
          OrganicKhad
        </div>

        {/* CENTER: Search */}
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

        {/* RIGHT: Nav Actions */}
        <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
          <button className="hover:text-brand-brown transition">
            Orders
          </button>

          <button className="hover:text-brand-brown transition">
            Cart
          </button>

          <button
            className="
              bg-green-600
              text-white
              px-5 py-2.5
              rounded-xl
              hover:bg-green-700
              transition
            "
          >
            Buy Now
          </button>
        </div>
      </div>
    </header>
  );
});

export default Navbar;