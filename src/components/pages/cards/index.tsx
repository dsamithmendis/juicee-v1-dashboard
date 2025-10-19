"use client";
import Image from "next/image";
import { useState } from "react";
import { useCards, CardData } from "@/hooks/useCards";

interface FormData {
  title: string;
  description: string;
  price: number;
}

export default function CardsPage() {
  const { cards, loading, error, deleteCard, updateCard } = useCards();
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: 0,
  });

  const startEdit = (card: CardData) => {
    setEditId(card._id);
    setFormData({
      title: card.title,
      description: card.description,
      price: card.price,
    });
  };

  const handleSave = async () => {
    if (editId) {
      await updateCard(editId, formData);
      setEditId(null);
    }
  };

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Uploaded Cards
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-orange-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card: CardData) => (
              <tr key={card._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <Image
                    src={card.base64}
                    alt="Card Image"
                    width={120}
                    height={120}
                    className="w-32 h-20 object-cover rounded-md"
                  />
                </td>

                <td className="px-6 py-4">
                  {editId === card._id ? (
                    <input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    <span className="text-gray-800 font-medium">
                      {card.title}
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  {editId === card._id ? (
                    <input
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    <span className="text-gray-600">{card.description}</span>
                  )}
                </td>

                <td className="px-6 py-4 text-gray-700 font-medium">
                  {card.category}
                </td>

                <td className="px-6 py-4 text-orange-600 font-bold">
                  {editId === card._id ? (
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: Number(e.target.value),
                        })
                      }
                      className="border p-1 rounded w-20"
                    />
                  ) : (
                    `LKR ${card.price}`
                  )}
                </td>

                <td className="px-6 py-4 space-x-2">
                  {editId === card._id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {card.category === "juice-card" && (
                        <button
                          onClick={() => startEdit(card)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => deleteCard(card._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
