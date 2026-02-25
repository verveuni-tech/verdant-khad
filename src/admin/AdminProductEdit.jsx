import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";
import { Upload, X } from "lucide-react";

export default function AdminProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      const snap = await getDoc(doc(db, "products", id));
      if (snap.exists()) {
        setForm({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  /* ================= IMAGE UPLOAD ================= */

  const handleImageUpload = async (files) => {
    setUploading(true);
    try {
      const uploaded = [];
      for (let file of files) {
        const url = await uploadToCloudinary(file);
        uploaded.push(url);
      }
      setForm((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...uploaded],
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const updated = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: updated });
  };

  /* ================= WEIGHT HANDLING ================= */

  const addWeight = () => {
    setForm({
      ...form,
      weights: [...(form.weights || []), { label: "", price: "" }],
    });
  };

  const updateWeight = (index, field, value) => {
    const updated = [...form.weights];
    updated[index][field] = value;
    setForm({ ...form, weights: updated });
  };

  const removeWeight = (index) => {
    setForm({
      ...form,
      weights: form.weights.filter((_, i) => i !== index),
    });
  };

  /* ================= ABOUT SECTION ================= */

  const addAboutPoint = () => {
    setForm({
      ...form,
      about: [...(form.about || []), ""],
    });
  };

  const updateAboutPoint = (index, value) => {
    const updated = [...form.about];
    updated[index] = value;
    setForm({ ...form, about: updated });
  };

  const removeAboutPoint = (index) => {
    setForm({
      ...form,
      about: form.about.filter((_, i) => i !== index),
    });
  };

  /* ================= UPDATE ================= */

  async function handleUpdate() {
    try {
      await updateDoc(doc(db, "products", id), {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        images: form.images || [],
        weights: form.weights || [],
        specs: form.specs || {},
        about: form.about || [],
      });

      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <div className="p-10">Loading...</div>;
  if (!form) return <div className="p-10">Product not found</div>;

  return (
    <div className="p-8 text-gray-100">
      <div className="max-w-4xl mx-auto space-y-10">

        <h1 className="text-3xl font-semibold">Edit Product</h1>

        <div className="bg-[#111827] p-8 rounded-2xl space-y-8">

          {/* Title */}
          <Input
            label="Title"
            value={form.title}
            onChange={(v) => setForm({ ...form, title: v })}
          />

          {/* Description */}
          <Textarea
            label="Description"
            value={form.description}
            onChange={(v) => setForm({ ...form, description: v })}
          />

          {/* Price + Stock */}
          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Price"
              type="number"
              value={form.price}
              onChange={(v) => setForm({ ...form, price: v })}
            />
            <Input
              label="Stock"
              type="number"
              value={form.stock}
              onChange={(v) => setForm({ ...form, stock: v })}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm text-gray-400">
              Product Images
            </label>

            <div className="border-2 border-dashed border-[#1E293B] rounded-xl p-6 mt-3 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                id="editUpload"
                onChange={(e) =>
                  handleImageUpload(e.target.files)
                }
              />
              <label htmlFor="editUpload" className="cursor-pointer">
                <Upload className="mx-auto mb-2" />
                {uploading ? "Uploading..." : "Upload Images"}
              </label>
            </div>

            {form.images?.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {form.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      className="h-28 w-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-black/60 p-1 rounded-full"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Weights */}
          <div>
            <label className="text-sm text-gray-400">
              Weight Variants
            </label>

            {form.weights?.map((weight, index) => (
              <div key={index} className="flex gap-4 mt-3">
                <input
                  value={weight.label}
                  onChange={(e) =>
                    updateWeight(index, "label", e.target.value)
                  }
                  placeholder="Label (e.g. 5 Kg)"
                  className="flex-1 bg-[#1F2937] px-4 py-2 rounded-lg"
                />
                <input
                  type="number"
                  value={weight.price}
                  onChange={(e) =>
                    updateWeight(index, "price", e.target.value)
                  }
                  placeholder="Price"
                  className="w-32 bg-[#1F2937] px-4 py-2 rounded-lg"
                />
                <button
                  onClick={() => removeWeight(index)}
                  className="text-red-400"
                >
                  <X size={18} />
                </button>
              </div>
            ))}

            <button
              onClick={addWeight}
              className="mt-3 text-emerald-400"
            >
              + Add Weight
            </button>
          </div>

          {/* About Section */}
          <div>
            <label className="text-sm text-gray-400">
              About Points
            </label>

            {form.about?.map((point, index) => (
              <div key={index} className="flex gap-4 mt-3">
                <input
                  value={point}
                  onChange={(e) =>
                    updateAboutPoint(index, e.target.value)
                  }
                  className="flex-1 bg-[#1F2937] px-4 py-2 rounded-lg"
                />
                <button
                  onClick={() => removeAboutPoint(index)}
                  className="text-red-400"
                >
                  <X size={18} />
                </button>
              </div>
            ))}

            <button
              onClick={addAboutPoint}
              className="mt-3 text-emerald-400"
            >
              + Add Point
            </button>
          </div>

          {/* Save */}
          <button
            onClick={handleUpdate}
            className="w-full bg-emerald-600 py-3 rounded-xl hover:bg-emerald-500"
          >
            Update Product
          </button>

        </div>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function Input({ label, value, onChange, type="text" }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 bg-[#1F2937] border border-[#1E293B] rounded-xl px-4 py-3"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 bg-[#1F2937] border border-[#1E293B] rounded-xl px-4 py-3 resize-none"
      />
    </div>
  );
}