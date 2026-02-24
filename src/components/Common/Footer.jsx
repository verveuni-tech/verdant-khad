import { memo } from "react";

const Footer = memo(function Footer() {
  return (
    <footer className="bg-[#0B1F17] text-gray-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-white">
              OrganicKhad
            </h2>

            <p className="text-sm text-gray-400 mt-4 max-w-md leading-relaxed">
              Premium organic compost and natural farming inputs delivered
              directly to farmers and home gardeners across India.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm text-white font-medium mb-3">
                Get farming tips & offers
              </p>

              <div className="flex max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
                    w-full
                    px-4 py-3
                    rounded-l-xl
                    bg-[#162C23]
                    border border-[#1F3A2E]
                    text-sm
                    focus:outline-none
                    focus:border-green-500
                  "
                />
                <button
                  className="
                    px-5
                    bg-green-600
                    text-white
                    rounded-r-xl
                    hover:bg-green-700
                    transition
                  "
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-5">
              Shop
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">All Products</li>
              <li className="hover:text-white cursor-pointer">Organic Compost</li>
              <li className="hover:text-white cursor-pointer">Vermicompost</li>
              <li className="hover:text-white cursor-pointer">Bulk Orders</li>
              <li className="hover:text-white cursor-pointer">Offers</li>
            </ul>
          </div>

          {/* Organic Types */}
          <div>
            <h4 className="text-white font-semibold mb-5">
              Organic Inputs
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">Neem Khali</li>
              <li className="hover:text-white cursor-pointer">Bone Meal</li>
              <li className="hover:text-white cursor-pointer">Fish Amino Acid</li>
              <li className="hover:text-white cursor-pointer">Panchagavya</li>
              <li className="hover:text-white cursor-pointer">NADEP Compost</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-5">
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">Contact Us</li>
              <li className="hover:text-white cursor-pointer">Shipping Policy</li>
              <li className="hover:text-white cursor-pointer">Returns</li>
              <li className="hover:text-white cursor-pointer">FAQ</li>
              <li className="hover:text-white cursor-pointer">Track Order</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-[#1F3A2E] mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">

          <p>
            © {new Date().getFullYear()} OrganicKhad. All rights reserved.
          </p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">
              Terms of Service
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
});

export default Footer;