"use client";
import { useEffect, useState } from "react";

interface ImageData {
  _id: string;
  name: string;
  base64: string;
  contentType: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then(setImages);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7ee] via-[#fcdcc9] to-[#fbb490] p-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Uploaded Images</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((img) => (
          <div
            key={img._id}
            className="bg-white rounded-xl shadow-md p-2 flex flex-col items-center"
          >
            <img src={img.base64} alt={img.name} className="w-full h-40 object-cover rounded-md" />
            <p className="mt-2 text-sm text-gray-700">{img.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
