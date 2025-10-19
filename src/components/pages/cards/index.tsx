"use client";
import Image from "next/image";
import { useImages } from "@/hooks/useCards";

export default function CardsPage() {
  const { images, loading, error } = useImages();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7ee] via-[#fcdcc9] to-[#fbb490] p-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Uploaded Images
      </h1>

      {loading && <p className="text-center text-gray-700">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div
            key={img._id}
            className="bg-white rounded-xl shadow-md p-3 flex flex-col items-center text-center"
          >
            <Image
              src={img.base64}
              alt={img.name}
              width={1200}
              height={1200}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="mt-2 text-lg font-semibold text-gray-800">
              {img.title}
            </h2>
            <p className="text-sm text-gray-600">{img.description}</p>
            <p className="mt-1 font-bold text-orange-600">LKR {img.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
