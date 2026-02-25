import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { Trash2, Pencil } from "lucide-react";

export default function AdminProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const snap = await getDocs(collection(db, "products"));
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-8 text-gray-100">
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">
            Manage Products
          </h1>

          <Link
            to="/admin/products/create"
            className="bg-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-500"
          >
            + Add Product
          </Link>
        </div>

        <div className="bg-[#111827] border border-[#1E293B] rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#1F2937] text-gray-400">
              <tr>
                <th className="p-4 text-left">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-[#1E293B] hover:bg-[#1A2232]"
                >
                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={product.images?.[0]}
                      className="h-12 w-12 object-cover rounded"
                      alt=""
                    />
                    <span>{product.title}</span>
                  </td>

                  <td className="p-4 text-center">
                    ₹ {product.price}
                  </td>

                  <td className="p-4 text-center">
                    {product.stock}
                  </td>

                  <td className="p-4 flex justify-center gap-4">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      <Pencil size={18} />
                    </Link>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No products found.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}