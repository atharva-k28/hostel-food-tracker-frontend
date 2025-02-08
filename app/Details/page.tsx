'use client';

import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function DetailsPage() {
  const [messData, setMessData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/students');
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
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f4] p-8">
      <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-xl border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 font-playfair mb-6 text-center">
          Student Meal Tracker
        </h1>

        {loading ? (
          <div className="text-lg text-gray-600 text-center py-10">Loading data...</div>
        ) : (
          <table className="min-w-full table-auto text-sm text-gray-700 border-collapse rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left border-b border-gray-300">PRN</th>
                <th className="py-3 px-6 text-left border-b border-gray-300">Name</th>
                <th className="py-3 px-6 text-center border-b border-gray-300">Breakfast</th>
                <th className="py-3 px-6 text-center border-b border-gray-300">Lunch</th>
                <th className="py-3 px-6 text-center border-b border-gray-300">Dinner</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {messData.map((stud) => (
                <tr key={stud._id} className="hover:bg-emerald-50 transition-all duration-200">
                  <td className="py-3 px-6 border-b border-gray-200">{stud.prn}</td>
                  <td className="py-3 px-6 border-b border-gray-200">{stud.name}</td>
                  {["breakfast", "lunch", "dinner"].map((meal) => (
                    <td key={meal} className="py-3 px-6 border-b border-gray-200">
                      <div className="flex justify-center">
                        {stud[meal] ? (
                          <CheckCircle className="w-6 h-6 text-green-500 hover:text-green-600 transition" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-500 hover:text-red-600 transition" />
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
