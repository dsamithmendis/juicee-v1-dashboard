import { useState, useEffect } from "react";

export interface ImageData {
  _id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  base64: string;
  contentType: string;
}

export function useImages() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/cards");
        if (!res.ok) throw new Error("Failed to fetch images");
        const data: ImageData[] = await res.json();
        setImages(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return { images, loading, error };
}
