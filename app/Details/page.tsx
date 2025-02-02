
import data from "@/utils/mockEntries";


export default function DetailsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f4] p-8">
      <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-xl border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 font-playfair mb-6 text-center">
          Student Meal Tracker
        </h1>
        <table className="min-w-full table-auto text-sm text-gray-700 border-collapse rounded-tl-lg rounded-tr-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left border-b border-gray-300">PRN</th>
              <th className="py-3 px-6 text-left border-b border-gray-300">Name</th>
              <th className="py-3 px-6 text-left border-b border-gray-300">Breakfast</th>
              <th className="py-3 px-6 text-left border-b border-gray-300">Lunch</th>
              <th className="py-3 px-6 text-left border-b border-gray-300">Dinner</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((stud) => (
              <tr
                key={stud.prn}
                className="hover:bg-emerald-50 transition-all duration-200"
              >
                <td className="py-3 px-6 border-b border-gray-200">{stud.prn}</td>
                <td className="py-3 px-6 border-b border-gray-200">{stud.name}</td>
                <td className="py-3 px-6 text-center border-b border-gray-200">
                  {stud.breakfast ? (
                    <span className="text-emerald-600">✅</span>
                  ) : (
                    <span className="text-red-600">❌</span>
                  )}
                </td>
                <td className="py-3 px-6 text-center border-b border-gray-200">
                  {stud.lunch ? (
                    <span className="text-emerald-600">✅</span>
                  ) : (
                    <span className="text-red-600">❌</span>
                  )}
                </td>
                <td className="py-3 px-6 text-center border-b border-gray-200">
                  {stud.dinner ? (
                    <span className="text-emerald-600">✅</span>
                  ) : (
                    <span className="text-red-600">❌</span>
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
