import { memo } from "react";
import CategoryCard from "../reusable/CategoryCard";

const Categories = memo(function Categories() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-brand-brown">
            Shop by Category
          </h2>
          <p className="text-brand-gray mt-2">
            High-quality organic inputs for sustainable farming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Top Left – Large */}
          <div className="md:col-span-2">
            <CategoryCard
              size="large"
              title="Organic Compost"
              description="Premium nutrient-rich compost to improve soil structure and increase crop productivity."
            />
          </div>

          {/* Top Right */}
          <CategoryCard
            title="Vermicompost"
            description="Earthworm processed compost for enhanced microbial activity."
          />

          {/* Bottom Row */}
          <CategoryCard title="Cow Manure" />
          <CategoryCard title="Potting Mix" />
          <CategoryCard title="Bulk Farming Packs" />
        </div>
      </div>
    </section>
  );
});

export default Categories;