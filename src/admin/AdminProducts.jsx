import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";
import { Upload, X, Plus } from "lucide-react";

export default function AdminProducts() {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [weights, setWeights] = useState([]);
  const [aboutPoints, setAboutPoints] = useState([]);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    specs: {
      itemWeight: "",
      itemForm: "",
      liquidVolume: "",
      specificUses: "",
    },
  });

  const [loading, setLoading] = useState(false);

  /* ================= FETCH CATEGORIES ================= */

  useEffect(() => {
    async function fetchCategories() {
      const snap = await getDocs(collection(db, "categories"));
      setCategories(
        snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    }
    fetchCategories();
  }, []);

  /* ================= SKU ================= */

  const generateSKU = (categoryId, title) => {
    const categoryCode = categoryId?.slice(0, 3).toUpperCase() || "GEN";
    const titleCode = title
      .split(" ")
      .slice(0, 2)
      .join("")
      .substring(0, 5)
      .toUpperCase();
    const random = Math.floor(100 + Math.random() * 900);
    return `OKH-${categoryCode}-${titleCode}-${random}`;
  };

  /* ================= IMAGE UPLOAD ================= */

  const handleImageUpload = async (files) => {
    setUploading(true);
    try {
      const uploaded = [];
      for (let file of files) {
        const url = await uploadToCloudinary(file);
        uploaded.push(url);
      }
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  /* ================= WEIGHTS ================= */

  const addWeight = () => {
    setWeights([...weights, { label: "", price: "" }]);
  };

  const updateWeight = (index, field, value) => {
    const updated = [...weights];
    updated[index][field] = value;
    setWeights(updated);
  };

  const removeWeight = (index) => {
    setWeights(weights.filter((_, i) => i !== index));
  };

  /* ================= ABOUT POINTS ================= */

  const addAboutPoint = () => {
    setAboutPoints([...aboutPoints, ""]);
  };

  const updateAboutPoint = (index, value) => {
    const updated = [...aboutPoints];
    updated[index] = value;
    setAboutPoints(updated);
  };

  const removeAboutPoint = (index) => {
    setAboutPoints(aboutPoints.filter((_, i) => i !== index));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (!form.title || !form.price || !form.categoryId) return;

    try {
      setLoading(true);

      const sku = generateSKU(form.categoryId, form.title);

      await addDoc(collection(db, "products"), {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        reservedStock: 0,
        weights: weights.map((w) => ({
          label: w.label,
          price: Number(w.price),
        })),
        about: aboutPoints.filter((p) => p.trim() !== ""),
        sku,
        images,
        createdAt: serverTimestamp(),
      });

     setSuccess(true);
setTimeout(() => setSuccess(false), 3000);

      setForm({
        title: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        specs: {
          itemWeight: "",
          itemForm: "",
          liquidVolume: "",
          specificUses: "",
        },
      });

      setWeights([]);
      setAboutPoints([]);
      setImages([]);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="p-8 text-gray-100">
      <div className="max-w-4xl mx-auto space-y-10">

        <h1 className="text-3xl font-semibold">
          Create Product
        </h1>

        <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-8 space-y-8">
          {success && (
  <div className="bg-emerald-900 border border-emerald-600 text-emerald-300 px-4 py-3 rounded-xl">
    ✅ Product created successfully
  </div>
)}

          {/* Images */}
          <Section title="Images">
            <UploadArea
              uploading={uploading}
              handleImageUpload={handleImageUpload}
            />
            <ImagePreview images={images} removeImage={removeImage} />
          </Section>

          {/* Basic Info */}
          <Section title="Basic Information">
            <Input label="Title" value={form.title}
              onChange={(v) => setForm({ ...form, title: v })} />

            <Textarea label="Description" value={form.description}
              onChange={(v) => setForm({ ...form, description: v })} />

            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Base Price (₹)" type="number"
                value={form.price}
                onChange={(v) => setForm({ ...form, price: v })} />

              <Input label="Stock" type="number"
                value={form.stock}
                onChange={(v) => setForm({ ...form, stock: v })} />
            </div>

            <Select label="Category"
              value={form.categoryId}
              onChange={(v) =>
                setForm({ ...form, categoryId: v })}>
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </Section>

          {/* Weights */}
          <Section title="Weight Variants">
            {weights.map((w, i) => (
              <div key={i} className="grid grid-cols-3 gap-4 items-center">
                <Input value={w.label}
                  onChange={(v) => updateWeight(i, "label", v)}
                  placeholder="1 Kg" />
                <Input type="number"
                  value={w.price}
                  onChange={(v) => updateWeight(i, "price", v)}
                  placeholder="Price" />
                <button onClick={() => removeWeight(i)}
                  className="text-red-400">Remove</button>
              </div>
            ))}
            <button onClick={addWeight}
              className="flex items-center gap-2 text-emerald-400">
              <Plus size={16} /> Add Weight
            </button>
          </Section>

          {/* About */}
          <Section title="About This Item">
            {aboutPoints.map((point, i) => (
              <div key={i} className="flex gap-3">
                <Input value={point}
                  onChange={(v) => updateAboutPoint(i, v)} />
                <button onClick={() => removeAboutPoint(i)}
                  className="text-red-400">X</button>
              </div>
            ))}
            <button onClick={addAboutPoint}
              className="flex items-center gap-2 text-emerald-400">
              <Plus size={16} /> Add Bullet Point
            </button>
          </Section>

          {/* Specifications */}
          <Section title="Specifications">
            <Input label="Item Weight"
              value={form.specs.itemWeight}
              onChange={(v) =>
                setForm({
                  ...form,
                  specs: { ...form.specs, itemWeight: v },
                })
              } />

            <Input label="Item Form"
              value={form.specs.itemForm}
              onChange={(v) =>
                setForm({
                  ...form,
                  specs: { ...form.specs, itemForm: v },
                })
              } />

            <Input label="Liquid Volume"
              value={form.specs.liquidVolume}
              onChange={(v) =>
                setForm({
                  ...form,
                  specs: { ...form.specs, liquidVolume: v },
                })
              } />

            <Input label="Specific Uses"
              value={form.specs.specificUses}
              onChange={(v) =>
                setForm({
                  ...form,
                  specs: { ...form.specs, specificUses: v },
                })
              } />
          </Section>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>

        </div>
      </div>
    </div>
  );
}

/* ---------- Small UI Components ---------- */



function Section({ title, children }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-emerald-400">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Input({ label, value, onChange, type="text", placeholder }) {
  return (
    <div className="w-full">
      {label && <label className="text-sm text-gray-400">{label}</label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 bg-[#1F2937] border border-[#1E293B] rounded-xl px-4 py-3 text-gray-100 focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      {label && <label className="text-sm text-gray-400">{label}</label>}
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 bg-[#1F2937] border border-[#1E293B] rounded-xl px-4 py-3 text-gray-100 focus:ring-2 focus:ring-emerald-500 resize-none"
      />
    </div>
  );
}

function Select({ label, value, onChange, children }) {
  return (
    <div>
      {label && <label className="text-sm text-gray-400">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 bg-[#1F2937] border border-[#1E293B] rounded-xl px-4 py-3 text-gray-100 focus:ring-2 focus:ring-emerald-500"
      >
        {children}
      </select>
    </div>
  );
}

function UploadArea({ uploading, handleImageUpload }) {
  return (
    <div className="border-2 border-dashed border-[#1E293B] rounded-xl p-6 text-center hover:border-emerald-500 transition">
      <input
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        id="imageUpload"
        onChange={(e) => handleImageUpload(e.target.files)}
      />
      <label htmlFor="imageUpload" className="cursor-pointer block">
        <Upload className="mx-auto mb-2" />
        {uploading ? "Uploading..." : "Click to upload images"}
      </label>
    </div>
  );
}

function ImagePreview({ images, removeImage }) {
  if (!images.length) return null;

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {images.map((img, index) => (
        <div key={index} className="relative">
          <img
            src={img}
            alt=""
            className="rounded-lg object-cover h-28 w-full"
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
  );
}