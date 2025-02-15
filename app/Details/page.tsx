"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

function DetailsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const date = searchParams.get("date") || "";
  const [messData, setMessData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!date) return;

    try {
      const response = await fetch(`/api/students?date=${date}`);
      const data = await response.json();
      setMessData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f4] p-4 sm:p-8">
      <div className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200">
        
        <Link href='/Details/form'>
        <button
          className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 transition mb-4 sm:mb-6"
        >
          <ArrowLeft size={20} />
          <span className="text-sm sm:text-base font-medium">Back</span>
        </button></Link>

        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-wide text-center mb-3 sm:mb-4">
          Hostel Mess Tracker
        </h1>
        <h2 className="text-sm sm:text-lg text-gray-600 text-center mb-4 sm:mb-6">
          Meal Records for <span className="font-semibold text-green-700">{date}</span>
        </h2>

        {loading ? (
          <div className="text-lg text-gray-600 text-center py-6 sm:py-10">Loading data...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm text-gray-700 border-collapse rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                <tr>
                  <th className="py-2 sm:py-3 px-4 sm:px-6 text-left border-b border-gray-300">PRN</th>
                  <th className="py-2 sm:py-3 px-4 sm:px-6 text-left border-b border-gray-300">Name</th>
                  <th className="py-2 sm:py-3 px-4 sm:px-6 text-center border-b border-gray-300">Breakfast</th>
                  <th className="py-2 sm:py-3 px-4 sm:px-6 text-center border-b border-gray-300">Lunch</th>
                  <th className="py-2 sm:py-3 px-4 sm:px-6 text-center border-b border-gray-300">Dinner</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {messData.length > 0 ? (
                  messData.map((stud) => (
                    <tr key={stud._id} className="hover:bg-emerald-50 transition-all duration-200">
                      <td className="py-2 sm:py-3 px-4 sm:px-6 border-b border-gray-200">{stud.prn}</td>
                      <td className="py-2 sm:py-3 px-4 sm:px-6 border-b border-gray-200">{stud.name}</td>
                      {["breakfast", "lunch", "dinner"].map((meal) => (
                        <td key={meal} className="py-2 sm:py-3 px-4 sm:px-6 border-b border-gray-200">
                          <div className="flex justify-center">
                            {stud[meal] ? (
                              <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-green-500 hover:text-green-600 transition" />
                            ) : (
                              <XCircle className="w-5 sm:w-6 h-5 sm:h-6 text-red-500 hover:text-red-600 transition" />
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 py-3 sm:py-4">
                      No data found for the selected date.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DetailsPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <DetailsPageContent />
    </Suspense>
  );
}
