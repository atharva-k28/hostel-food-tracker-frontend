"use client";

import { useState } from "react";
import Link from "next/link";

export default function Form() {
  const today: string = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>(today);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Select Date</h1>
        <div className="flex flex-col gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          {selectedDate ? (
            <Link
              href={`/Details?date=${selectedDate}`}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg text-center transition"
            >
              View Details
            </Link>
          ) : (
            <button
              disabled
              className="bg-gray-300 text-white font-bold py-2 px-4 rounded-lg cursor-not-allowed"
            >
              Select a Date
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
