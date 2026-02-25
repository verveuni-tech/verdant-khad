import { memo, useEffect, useState, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import ProductCard from "../reusable/ProductCard";

/* Placeholder Products */
const placeholderProducts = Array(4).fill({
  title: "Coming Soon Product",
  price: 0,
  weight: "—",
  rating: 0,
  reviews: 0,
  badge: "COMING SOON",
  placeholder: true,
});

const FeaturedProducts = memo(function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsSnap, categoriesSnap] = await Promise.all([
          getDocs(collection(db, "products")),
          getDocs(collection(db, "categories")),
        ]);

        const allProducts = productsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(allProducts);
        setCategoriesCount(categoriesSnap.size);
      } catch (error) {
        console.error("Featured fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  /* -------- Distinct Category Logic -------- */

  const featuredProducts = useMemo(() => {
    if (loading) return placeholderProducts;

    if (products.length < 4 || categoriesCount < 4) {
      return placeholderProducts;
    }

    const categoryMap = new Map();

    for (let product of products) {
      if (!categoryMap.has(product.categoryId)) {
        categoryMap.set(product.categoryId, product);
      }
      if (categoryMap.size === 4) break;
    }

    if (categoryMap.size < 4) {
      return placeholderProducts;
    }

    return Array.from(categoryMap.values()).slice(0, 4);
  }, [products, categoriesCount, loading]);

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

          <button className="hidden md:block text-sm font-medium text-green-600 hover:underline">
            View All →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => {
            const isPlaceholder = product.placeholder;

            const card = (
              <ProductCard
                {...product}
                image={product.images?.[0]}
              />
            );

            if (!isPlaceholder && product.id) {
              return (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="block"
                >
                  {card}
                </Link>
              );
            }

            return (
              <div key={index}>
                {card}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
});

export default FeaturedProducts;