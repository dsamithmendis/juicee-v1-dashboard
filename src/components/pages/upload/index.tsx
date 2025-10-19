"use client";
import { useState } from "react";

export default function UploadPage() {
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setMessage("Uploading...");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#fff7ee] via-[#fcdcc9] to-[#fbb490]">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Upload an Image</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <input type="file" name="file" accept="image/*" required />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
        >
          Upload
        </button>
      </form>

      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}
