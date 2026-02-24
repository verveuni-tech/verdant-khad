import { memo } from "react";

const ProductCard = memo(function ProductCard({
  title,
  price,
  weight,
  rating,
  reviews,
  badge,
}) {
  return (
    <div
      className="
        group relative bg-white
        border border-gray-200
        rounded-3xl p-5
        shadow-sm
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
      "
    >
      {/* Badge */}
      {badge && (
        <span className="
          absolute top-4 left-4
          bg-green-600 text-white
          text-xs px-3 py-1
          rounded-full font-medium
        ">
          {badge}
        </span>
      )}

      {/* Product Surface (Neutral) */}
      <div className="
        h-44 rounded-2xl mb-5
        bg-gradient-to-br
        from-gray-100 via-gray-50 to-gray-100
      " />

      {/* Title */}
      <h3 className="
        text-sm md:text-base
        font-semibold text-brand-brown
        line-clamp-2
      ">
        {title}
      </h3>

      {/* Weight */}
      <p className="text-xs text-brand-gray mt-1">
        {weight}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-2 text-xs text-brand-gray">
        <span className="font-semibold text-brand-brown">
          {rating} ★
        </span>
        <span>({reviews})</span>
      </div>

      {/* Price + CTA */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-lg font-bold text-brand-brown">
          ₹{price}
        </p>

        <button
          className="
            bg-green-600 text-white
            text-xs px-4 py-2
            rounded-lg font-medium
            transition
            hover:bg-green-700
          "
        >
          Add
        </button>
      </div>
    </div>
  );
});

export default ProductCard;