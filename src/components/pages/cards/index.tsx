"use client";
import Image from "next/image";
import { useState } from "react";
import { useCards, CardData } from "@/hooks/useCards";
import { RiEditLine, RiDeleteBinLine } from "@remixicon/react";
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

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-10">
      <div className="flex justify-center items-center space-x-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">JUICEE Dashboard</h1>
        <RiEditLine
          className="text-gray-600 hover:text-gray-800 cursor-pointer"
          size={28}
          onClick={() => setModalType("juice")}
        />
        <RiDeleteBinLine
          className="text-gray-600 hover:text-gray-800 cursor-pointer"
          size={28}
          onClick={() => setModalType("fruit")}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-orange-100">
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
          <tbody>
            {cards.map((card: CardData) => (
              <tr key={card._id} className="hover:bg-gray-50">
                {/* Image */}
                <td className="px-6 py-4">
                  <Image
                    src={card.base64}
                    alt="Card Image"
                    width={1200}
                    height={1200}
                    className="w-32 h-20 object-cover rounded-md"
                  />
                </td>

                {/* Title */}
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

                {/* Description */}
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

                {/* Category */}
                <td className="px-6 py-4 text-gray-700 font-medium">
                  {card.category}
                </td>

                {/* Price */}
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

                {/* Action */}
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

      {/* Fullscreen Modal */}
      <Modal isOpen={modalType !== null} onClose={() => setModalType(null)}>
        {modalType === "fruit" && <UploadFruitCardPage />}
        {modalType === "juice" && <UploadJuiceCardPage />}
      </Modal>
    </div>
  );
}
