import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import { ShoppingCart } from "lucide-react";

export default function ProductDetail() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const snap = await getDoc(doc(db, "products", productId));
        if (!snap.exists()) {
          setProduct(null);
          return;
        }

        const data = { id: snap.id, ...snap.data() };
        setProduct(data);

        if (data.weights?.length) {
          setSelectedWeight(data.weights[0]);
        }

        const relatedQuery = query(
          collection(db, "products"),
          where("categoryId", "==", data.categoryId),
          limit(8)
        );

        const relatedSnap = await getDocs(relatedQuery);
        const relatedProducts = relatedSnap.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((p) => p.id !== productId)
          .slice(0, 4);

        setRelated(relatedProducts);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  const availableStock = useMemo(() => {
    if (!product) return 0;
    return (product.stock || 0) - (product.reservedStock || 0);
  }, [product]);

  const displayPrice = selectedWeight?.price || product?.price;

  if (loading)
    return <div className="p-20 text-center">Loading...</div>;

  if (!product)
    return <div className="p-20 text-center text-red-500">Product not found.</div>;
return (
  <div className="bg-[#F6F8F6] min-h-screen py-16 px-6">
    <div className="max-w-7xl mx-auto">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-12">
        <Link to="/" className="hover:text-green-600 transition">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">
          {product.title}
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-20 items-start">

        {/* LEFT — IMAGE */}
        {/* LEFT — HERO IMAGE */}
<div className="w-full">

  <div className="
    bg-[#F3F4F6]
    rounded-3xl
    p-4
    shadow-sm
  ">
    <div className="
      w-full
      overflow-hidden
      rounded-2xl
      bg-white
    ">
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="
          w-full
          h-[520px]
          object-cover
          object-center
        "
      />
    </div>
  </div>

</div>

        {/* RIGHT — INFO */}
        <div className="space-y-10">

          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
              {product.title}
            </h1>

            <p className="text-gray-500 mt-2">
              Premium organic agricultural input
            </p>
          </div>

          {/* Price */}
          <div className="text-4xl font-bold text-green-600">
            ₹ {displayPrice?.toLocaleString()}
          </div>

          {/* Weight Selector */}
          {product.weights?.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-600 mb-4">
                Choose Variant
              </p>

              <div className="flex flex-wrap gap-3">
                {product.weights.map((w, idx) => {
                  const active =
                    selectedWeight?.label === w.label;

                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedWeight(w)}
                      className={`
                        px-6 py-2.5
                        rounded-full
                        text-sm font-medium
                        transition-all
                        ${
                          active
                            ? "bg-green-600 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-green-50"
                        }
                      `}
                    >
                      {w.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity + CTA */}
          <div className="flex items-center gap-6 pt-4">

            <div className="
              flex items-center
              bg-white
              rounded-full
              shadow-sm
              overflow-hidden
            ">
              <button
                onClick={() =>
                  setQuantity((prev) =>
                    Math.max(1, prev - 1)
                  )
                }
                className="px-6 py-3 hover:bg-gray-50 transition"
              >
                −
              </button>

              <div className="px-8 font-medium">
                {quantity}
              </div>

              <button
                onClick={() =>
                  setQuantity((prev) =>
                    Math.min(availableStock, prev + 1)
                  )
                }
                className="px-6 py-3 hover:bg-gray-50 transition"
              >
                +
              </button>
            </div>

            <button
              disabled={availableStock === 0}
              className="
                flex items-center gap-3
                px-10 py-4
                rounded-full
                bg-green-600
                hover:bg-green-700
                text-white
                font-medium
                transition
                disabled:bg-gray-300
              "
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>

          {/* About Section */}
          {product.about?.length > 0 && (
            <div className="pt-6">
              <h3 className="text-lg font-semibold mb-4">
                About this product
              </h3>

              <ul className="space-y-3 text-gray-600 text-sm">
                {product.about.map((point, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-green-600">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specs && (
            <div className="pt-8 border-t border-gray-100">
              <h3 className="text-lg font-semibold mb-6">
                Product Details
              </h3>

              <div className="grid grid-cols-2 gap-y-6 gap-x-12 text-sm">
                <Spec label="Item Weight" value={product.specs.itemWeight} />
                <Spec label="Item Form" value={product.specs.itemForm} />
                <Spec label="Liquid Volume" value={product.specs.liquidVolume} />
                <Spec label="Specific Uses" value={product.specs.specificUses} />
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-32">
          <h2 className="text-2xl font-semibold mb-10">
            Related Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="
                  group
                  bg-white
                  rounded-3xl
                  shadow-sm
                  hover:shadow-lg
                  transition
                  p-6
                "
              >
                <div className="
                  aspect-square
                  bg-gray-50
                  rounded-2xl
                  flex items-center justify-center
                  mb-5
                ">
                  <img
                    src={item.images?.[0]}
                    className="max-h-40 object-contain"
                  />
                </div>

                <p className="text-sm font-medium line-clamp-2">
                  {item.title}
                </p>

                <p className="text-green-600 font-semibold mt-2">
                  ₹ {item.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  </div>
);
}

function Spec({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}