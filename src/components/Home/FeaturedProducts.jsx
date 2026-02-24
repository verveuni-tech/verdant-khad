import { memo } from "react";
import ProductCard from "../reusable/ProductCard";

const products = [
  {
    title: "Premium Organic Compost",
    price: 299,
    weight: "5 Kg Pack",
    rating: 4.8,
    reviews: 1240,
    badge: "Best Seller",
  },
  {
    title: "Vermicompost Enriched Mix",
    price: 1199,
    weight: "25 Kg Pack",
    rating: 4.7,
    reviews: 980,
    badge: "Top Rated",
  },
  {
    title: "Natural Cow Manure",
    price: 249,
    weight: "5 Kg Pack",
    rating: 4.6,
    reviews: 640,
  },
  {
    title: "Advanced Potting Mix",
    price: 349,
    weight: "10 Kg Pack",
    rating: 4.9,
    reviews: 530,
  },
];

const FeaturedProducts = memo(function FeaturedProducts() {
  return (
    <section className="bg-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-brand-brown">
              Featured Products
            </h2>
            <p className="text-brand-gray mt-2">
              Top selling compost products trusted by farmers.
            </p>
          </div>

          <button className="
            hidden md:block
            text-sm font-medium
            text-green-600
            hover:underline
          ">
            View All →
          </button>
        </div>

        {/* Grid */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        ">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

      </div>
    </section>
  );
});

export default FeaturedProducts;