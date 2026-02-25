import { memo } from "react";

const ProductCard = memo(function ProductCard({
  title,
  price,
  weight,
  rating,
  reviews,
  badge,
  image,
  placeholder,
}) {
  return (
    <div
      className={`
        group relative bg-white
        border border-gray-200
        rounded-3xl p-5
        shadow-sm
        transition-all duration-300
        ${
          placeholder
            ? "opacity-60 grayscale pointer-events-none"
            : "hover:shadow-xl hover:-translate-y-1"
        }
      `}
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

      {/* Placeholder Overlay */}
      {placeholder && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-3xl border-2 border-dashed border-green-400">
          <span className="text-green-700 font-semibold text-sm tracking-wide">
            COMING SOON
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="h-44 rounded-2xl mb-5 overflow-hidden bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="
        text-sm md:text-base
        font-semibold text-brand-brown
        line-clamp-2
      ">
        {title}
      </h3>

      {/* Weight */}
      {weight && (
        <p className="text-xs text-brand-gray mt-1">
          {weight}
        </p>
      )}

      {/* Rating */}
      {rating > 0 && (
        <div className="flex items-center gap-2 mt-2 text-xs text-brand-gray">
          <span className="font-semibold text-brand-brown">
            {rating} ★
          </span>
          <span>({reviews})</span>
        </div>
      )}

      {/* Price + CTA */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-lg font-bold text-brand-brown">
          ₹{price}
        </p>

        {!placeholder && (
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
        )}
      </div>
    </div>
  );
});

export default ProductCard;