"use client";

import React from "react";

interface Props {
  rows?: number;
}

export default function CardsTableSkeleton({ rows = 5 }: Props) {
  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="h-10 w-56 rounded-md bg-gray-200 animate-pulse" />
        <div className="flex space-x-3">
          <div className="h-10 w-28 rounded-md bg-gray-200 animate-pulse" />
          <div className="h-10 w-28 rounded-md bg-gray-200 animate-pulse" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          <table className="min-w-full">
            <thead className=" rounded-t-xl">
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
                    <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="">
              {Array.from({ length: rows }).map((_, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-32 h-20 rounded-md bg-gray-200 animate-pulse" />
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-5 w-40 rounded bg-gray-200 animate-pulse" />
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-4 w-72 rounded bg-gray-200 animate-pulse" />
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-5 w-20 rounded bg-gray-200 animate-pulse" />
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-5 w-24 rounded bg-gray-200 animate-pulse" />
                  </td>

                  <td className="px-6 py-4 space-x-2">
                    <div className="inline-flex gap-2">
                      <div className="h-8 w-16 rounded bg-gray-200 animate-pulse" />
                      <div className="h-8 w-16 rounded bg-gray-200 animate-pulse" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
