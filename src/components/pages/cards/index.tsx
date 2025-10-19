"use client";
import Image from "next/image";
import { useState } from "react";
import { useCards, CardData } from "@/hooks/useCards";
import { RiAddLine } from "@remixicon/react";
import Modal from "@/components/modals";
import UploadJuiceCardPage from "@/components/pages/upload-juice-cards";
import UploadFruitCardPage from "@/components/pages/upload-fruit-cards";

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
  const [modalType, setModalType] = useState<"fruit" | "juice" | null>(null);

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

  if (loading)
    return <p className="text-center text-gray-700 mt-20">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0">
        <h1 className="text-4xl font-bold text-gray-800">JUICEE Dashboard</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setModalType("juice")}
            className="cursor-pointer flex items-center px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            <RiAddLine className="mr-2" /> Add Juice
          </button>
          <button
            onClick={() => setModalType("fruit")}
            className="cursor-pointer flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <RiAddLine className="mr-2" /> Add Fruit
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-orange-100 rounded-t-xl">
              <tr>
                {[
                  "Image",
                  "Title",
                  "Description",
                  "Category",
                  "Price",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-800"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cards.map((card: CardData) => (
                <tr
                  key={card._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Image
                      src={card.base64}
                      alt="Card Image"
                      width={1200}
                      height={1200}
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
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        {card.category === "juice-card" && (
                          <button
                            onClick={() => startEdit(card)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => deleteCard(card._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
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

      <Modal isOpen={modalType !== null} onClose={() => setModalType(null)}>
        {modalType === "fruit" && <UploadFruitCardPage />}
        {modalType === "juice" && <UploadJuiceCardPage />}
      </Modal>
    </div>
  );
}
