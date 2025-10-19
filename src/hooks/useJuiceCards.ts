import { useState } from "react";

export function useJuiceUpload() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function uploadJuice(formData: FormData) {
    try {
      setLoading(true);
      setMessage("Uploading...");

      const res = await fetch("/api/upload-juice-cards", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Upload successful");
      } else {
        setMessage(data.error || "Upload failed");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return { message, loading, uploadJuice };
}
