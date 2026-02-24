import { memo, useState } from "react";

const weights = [
  { label: "5 Kg", price: 299 },
  { label: "25 Kg", price: 1199 },
  { label: "Bulk (100 Kg)", price: 3999 },
];

const Hero = memo(function Hero() {
  const [selected, setSelected] = useState(weights[0]);

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 md:gap-12 items-start">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* Category Strip */}
          <div className="flex gap-3 flex-wrap text-xs sm:text-sm">
            <span className="bg-green-100 text-brand-green px-3 py-1 rounded-full">
              Organic Compost
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Vermicompost
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Cow Manure
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-brown leading-snug">
            Premium Organic Compost (Chemical-Free)
          </h1>

          <p className="text-brand-gray text-sm sm:text-base max-w-xl">
            High nutrient compost ideal for vegetables, fruits, and grains.
            Improves soil fertility and increases crop yield naturally.
          </p>

          {/* Trust Info */}
          <div className="flex gap-6 sm:gap-10 text-xs sm:text-sm text-brand-gray">
            <div>
              <p className="font-semibold text-brand-brown">4.8 ★</p>
              <p>1,200 Reviews</p>
            </div>
            <div>
              <p className="font-semibold text-brand-brown">500+</p>
              <p>Farmers Served</p>
            </div>
            <div>
              <p className="font-semibold text-brand-brown">Fast</p>
              <p>Delivery</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – PRODUCT CARD */}
        <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 border border-gray-200">

          {/* Solid Visual Surface */}
          <div className="w-full h-56 sm:h-64 md:h-72 rounded-xl mb-6 bg-gradient-to-br from-brand-brown/10 via-brand-green/10 to-brand-blue/10 flex items-center justify-center">
            <div className="text-center px-6">
              <p className="text-lg sm:text-xl font-semibold text-brand-brown">
                Organic Compost
              </p>
              <p className="text-xs sm:text-sm text-brand-gray mt-2">
                Product image coming soon
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="mb-4">
            <p className="text-xl sm:text-2xl font-bold text-brand-brown">
              ₹{selected.price}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Inclusive of all taxes
            </p>
          </div>

          {/* Weight Options */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {weights.map((w) => (
              <button
                key={w.label}
                onClick={() => setSelected(w)}
                className={`py-2 rounded-lg border text-xs sm:text-sm font-medium transition ${
                  selected.label === w.label
                    ? "bg-brand-green text-white border-brand-green"
                    : "border-gray-300 hover:border-brand-green"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button className="w-full bg-brand-green text-white py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-green-700 transition">
            Add to Cart
          </button>

          <p className="text-xs text-center text-gray-500 mt-3">
            Delivery within 3–5 days
          </p>
        </div>

      </div>
    </section>
  );
});

export default Hero;