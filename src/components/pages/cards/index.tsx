"use client";
import Image from "next/image";
import { useCards } from "@/hooks/useCards";

export default function CardsPage() {
  const { cards, loading, error, deleteCard } = useCards();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7ee] via-[#fcdcc9] to-[#fbb490] p-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Uploaded Cards
      </h1>

      {loading && <p className="text-center text-gray-700">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
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
              {cards.map((card) => (
                <tr key={card._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Image
                      src={card.base64}
                      alt={card.name}
                      width={120}
                      height={120}
                      className="w-32 h-20 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {card.title}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {card.description}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {card.category}
                  </td>
                  <td className="px-6 py-4 text-orange-600 font-bold">
                    LKR {card.price}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteCard(card._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
