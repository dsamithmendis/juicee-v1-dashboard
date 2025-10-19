"use client";
import { useRef, useState } from "react";
import { useUpload } from "@/hooks/useFruitCards";
import { RiImageLine } from "@remixicon/react";
import Image from "next/image";

export default function UploadFruitCardPage() {
  const { message, loading, uploadFile } = useUpload();
  const formRef = useRef<HTMLFormElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [previewSrc, setPreviewSrc] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    uploadFile(formData);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#fff7ee] via-[#fcdcc9] to-[#fbb490] p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Upload an Image</h1>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full max-w-md"
      >
        <label className="flex items-center justify-start border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-orange-500">
          <RiImageLine size={24} color="#9CA3AF" className="mr-2" />
          <span className="text-gray-600">{fileName || "Choose a file"}</span>
          <input
            type="file"
            name="file"
            accept="image/*"
            className="hidden"
            required
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
          className={`w-full px-4 py-2 rounded-lg text-white ${
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
