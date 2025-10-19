"use client";
import { useRef, useState } from "react";
import { useJuiceUpload } from "@/hooks/useJuiceCards";
import { RiImageLine } from "@remixicon/react";
import Image from "next/image";

export default function UploadJuiceCardPage() {
  const { message, loading, uploadJuice } = useJuiceUpload();
  const formRef = useRef<HTMLFormElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [previewSrc, setPreviewSrc] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    uploadJuice(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setPreviewSrc(URL.createObjectURL(file));
    } else {
      setFileName("");
      setPreviewSrc("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#fff7ee] via-[#fcdcc9] to-[#fbb490] px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Upload Juice Card
      </h1>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full max-w-md"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Enter title"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Price (LKR)
          </label>
          <input
            id="price"
            type="number"
            name="price"
            placeholder="Enter price"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        <label className="flex items-center justify-start border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-orange-500">
          <RiImageLine size={24} color="#9CA3AF" className="mr-2" />
          <span className="text-gray-600">{fileName || "Choose an image"}</span>
          <input
            type="file"
            name="file"
            accept="image/*"
            required
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {previewSrc && (
          <Image
            src={previewSrc}
            alt="Preview"
            width={1200}
            height={1200}
            className="w-full h-64 object-contain border rounded-md mt-2"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded-lg text-white transition ${
            loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}
