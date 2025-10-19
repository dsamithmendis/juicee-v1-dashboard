import { useState, useEffect } from "react";

export interface CardData {
  _id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  base64: string;
  contentType: string;
  category: string;
}

export function useCards() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/cards");
        if (!res.ok) throw new Error("Failed to fetch cards");

        const data: CardData[] = await res.json();
        setCards(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return { cards, loading, error };
}
