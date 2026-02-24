import { memo } from "react";

const CategoryCard = memo(function CategoryCard({
  title,
  description,
  size = "normal", // normal | large
}) {
  const isLarge = size === "large";

  return (
    <div
      className={`
        relative rounded-3xl border border-gray-200 bg-white
        overflow-hidden transition hover:shadow-xl
        ${isLarge ? "p-10" : "p-8"}
      `}
    >
      {/* Visual Surface */}
      <div
        className={`
          rounded-2xl mb-6
          bg-gradient-to-br from-brand-brown/10 via-brand-green/10 to-brand-blue/10
          ${isLarge ? "h-56" : "h-40"}
        `}
      />

      <h3 className={`${isLarge ? "text-2xl" : "text-lg"} font-semibold text-brand-brown`}>
        {title}
      </h3>

      {description && (
        <p className="text-sm text-brand-gray mt-2 max-w-sm">
          {description}
        </p>
      )}

      <button className="mt-4 text-sm font-medium text-brand-green hover:underline">
        Explore →
      </button>
    </div>
  );
});

export default CategoryCard;