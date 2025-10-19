import { useState, useEffect, useCallback } from "react";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/cards");
      if (!res.ok) throw new Error("Failed to fetch cards");

      const data: CardData[] = await res.json();
      setCards(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
      setCards([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const deleteCard = async (id: string) => {
    try {
      const res = await fetch(`/api/cards?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete card");
      fetchCards();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    }
  };

  const updateCard = async (id: string, updatedFields: Partial<CardData>) => {
    try {
      const res = await fetch("/api/cards", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updatedFields }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update card");
      }
      fetchCards();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    }
  };

  return { cards, loading, error, fetchCards, deleteCard, updateCard };
}
