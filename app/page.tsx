import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f4] text-center p-6">
      
      {/* Main Content */}
      <div className="max-w-3xl px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 font-playfair mb-6">
          HOSTEL MESS FOOD TRACKER
        </h1>
        
        <h2 className="text-lg sm:text-xl text-gray-700 font-inter leading-relaxed">
          A solution presented by 
          <span className="text-emerald-600 font-semibold"> Google Developers Group MIT-WPU </span>
          to help track food usage across hostels and contribute to the noble cause of 
          <span className="text-emerald-600 font-semibold"> sustainability.</span>
        </h2>
      </div>

      {/* Buttons Section */}
      <div className="mt-10 flex flex-col sm:flex-row w-full sm:w-auto space-y-4 sm:space-y-0 sm:space-x-6">
        <Link href="/Dashboard">
          <button className="w-full sm:w-56 px-6 py-3 bg-emerald-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-emerald-700 transition">
            View Dashboard
          </button>
        </Link>
        <Link href="/Details/form">
          <button className="w-full sm:w-56 px-6 py-3 bg-emerald-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-emerald-700 transition">
            View Student Details
          </button>
        </Link>
      </div>
    </div>
  );
}
