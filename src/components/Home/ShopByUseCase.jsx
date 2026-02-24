import { memo, useState } from "react";

const useCaseData = {
  Vegetables: [
    "Vermicompost",
    "Poultry Manure",
    "Neem Khali",
    "Organic Potash Mix",
  ],
  Flowers: [
    "Bone Meal",
    "Seaweed Extract",
    "Compost Tea",
    "Flower Booster Mix",
  ],
  Fruits: [
    "Cow Dung Compost",
    "Fish Amino Acid",
    "Mustard Khali",
    "Organic Micronutrient Blend",
  ],
  "Terrace Garden": [
    "Potting Mix",
    "Vermicompost",
    "Jeevamrit",
    "Cocopeat Mix",
  ],
  "Organic Farming": [
    "Bulk Compost",
    "NADEP Compost",
    "Panchagavya",
    "Soil Conditioner Pro",
  ],
};

const ShopByUseCase = memo(function ShopByUseCase() {
  const categories = Object.keys(useCaseData);
  const [active, setActive] = useState(categories[0]);

  return (
    <section className="bg-[#0B1F17] py-28">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16">

        {/* LEFT SIDE */}
        <div className="flex flex-col">
          <h2 className="text-5xl font-bold text-white leading-tight">
            Find the Right Input
            <br />
            for Your Crop
          </h2>

          <p className="text-gray-400 mt-6 max-w-md text-lg">
            Select your crop type and explore recommended organic inputs tailored to your farming needs.
          </p>

          {/* Vertical Selector */}
          <div className="mt-12 space-y-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`
                  w-full text-left px-6 py-4 rounded-xl transition-all duration-300
                  ${
                    active === cat
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-[#162C23] text-gray-300 hover:bg-[#1F3A2E]"
                  }
                `}
              >
                <span className="text-base font-medium">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <div className="bg-[#111F18] p-10 rounded-3xl">
            <h3 className="text-white text-2xl font-semibold mb-8">
              Recommended for {active}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {useCaseData[active].map((item, index) => (
                <div
                  key={index}
                  className="
                    bg-white
                    rounded-2xl
                    p-6
                    shadow-lg
                    transition-all duration-300
                    hover:shadow-2xl hover:-translate-y-1
                  "
                >
                  <div className="h-24 mb-5 rounded-xl bg-green-100" />

                  <h4 className="text-base font-semibold text-brand-brown">
                    {item}
                  </h4>

                  <button className="text-sm text-green-600 mt-4 hover:underline">
                    View Product →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
});

export default ShopByUseCase;