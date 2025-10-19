"use client";
import { useRef } from "react";
import { useUpload } from "@/hooks/useFruitCards";

export default function UploadFruitCardPage() {
  const { message, loading, uploadFile } = useUpload();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    uploadFile(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#fff7ee] via-[#fcdcc9] to-[#fbb490]">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Upload an Image</h1>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <input type="file" name="file" accept="image/*" required />
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white ${
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
