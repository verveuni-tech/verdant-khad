export async function uploadToCloudinary(file) {
  const cloudName = "dvtbbuxon";
  const uploadPreset = "verdant-khad";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "khads/products");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  // Return optimized transformation URL
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${data.public_id}.${data.format}`;
}