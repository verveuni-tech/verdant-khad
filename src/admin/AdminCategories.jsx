import { useEffect, useState, useCallback } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    order: 0,
    isActive: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    const q = query(
      collection(db, "categories"),
      orderBy("order", "asc")
    );
    const snap = await getDocs(q);
    setCategories(
      snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const generateSlug = (value) =>
    value.toLowerCase().trim().replace(/\s+/g, "-");

  const handleAdd = async () => {
    if (!form.name.trim() || !imageFile) return;

    try {
      setLoading(true);

      // Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary(imageFile);

      const slug = generateSlug(form.name);

      const docRef = await addDoc(collection(db, "categories"), {
        name: form.name.trim(),
        slug,
        image: imageUrl,
        description: form.description.trim(),
        order: Number(form.order),
        isActive: form.isActive,
        createdAt: serverTimestamp(),
      });

      // Optimistic update
      setCategories((prev) => [
        ...prev,
        {
          id: docRef.id,
          ...form,
          image: imageUrl,
          slug,
        },
      ]);

      // Reset form
      setForm({
        name: "",
        description: "",
        order: 0,
        isActive: true,
      });
      setImageFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Category creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 text-gray-100">
      <div className="max-w-4xl mx-auto">

        <div className="mb-10">
          <h1 className="text-3xl font-semibold">
            Manage Categories
          </h1>
          <p className="text-gray-400 mt-1">
            Control homepage category display
          </p>
        </div>

        <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-8 space-y-8">

          {/* Form */}
          <div className="grid md:grid-cols-2 gap-6">

            <input
              placeholder="Category Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="bg-[#1F2937] border border-[#1E293B] rounded-xl px-4 py-3"
            />

            <input
              type="number"
              placeholder="Display Order"
              value={form.order}
              onChange={(e) =>
                setForm({ ...form, order: e.target.value })
              }
              className="bg-[#1F2937] border border-[#1E293B] rounded-xl px-4 py-3"
            />

            <select
              value={form.isActive}
              onChange={(e) =>
                setForm({
                  ...form,
                  isActive: e.target.value === "true",
                })
              }
              className="bg-[#1F2937] border border-[#1E293B] rounded-xl px-4 py-3"
            >
              <option value="true">Active</option>
              <option value="false">Hidden</option>
            </select>

            <textarea
              placeholder="Short Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="md:col-span-2 bg-[#1F2937] border border-[#1E293B] rounded-xl px-4 py-3"
            />

            {/* Image Upload */}
           {/* Category Image Upload */}
<div className="md:col-span-2">
  <label className="block text-sm text-gray-400 mb-3">
    Category Image
  </label>

  <div
    onClick={() => document.getElementById("categoryUpload").click()}
    className="cursor-pointer border-2 border-dashed border-[#1E293B] hover:border-emerald-500 transition rounded-2xl p-10 text-center bg-[#0F172A]"
  >
    {!preview ? (
      <div className="flex flex-col items-center gap-3 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-emerald-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16"
          />
        </svg>
        <p className="text-sm">
          Click to upload image
        </p>
        <p className="text-xs text-gray-500">
          PNG, JPG, WebP supported
        </p>
      </div>
    ) : (
      <div className="flex flex-col items-center gap-4">
        <img
          src={preview}
          alt="Preview"
          className="w-48 h-48 object-cover rounded-xl border border-[#1E293B]"
        />
        <p className="text-xs text-gray-500">
          Click to change image
        </p>
      </div>
    )}
  </div>

  <input
    id="categoryUpload"
    type="file"
    accept="image/*"
    hidden
    onChange={(e) => {
      const file = e.target.files[0];
      if (!file) return;

      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }}
  />
</div>
          </div>

          <button
            onClick={handleAdd}
            disabled={loading}
            className={`px-6 py-3 rounded-xl font-medium transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500"
            }`}
          >
            {loading ? "Uploading..." : "Add Category"}
          </button>

          {/* List */}
          <div className="space-y-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-[#1F2937] border border-[#1E293B] rounded-xl p-4 flex gap-4"
              >
                {cat.image && (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}

                <div className="flex-1">
                  <p className="font-medium">{cat.name}</p>
                  <p className="text-xs text-gray-500">
                    /{cat.slug}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {cat.description}
                  </p>
                </div>

                <div className="text-right text-xs text-gray-500">
                  <p>Order: {cat.order}</p>
                  <p>
                    {cat.isActive ? "Active" : "Hidden"}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}