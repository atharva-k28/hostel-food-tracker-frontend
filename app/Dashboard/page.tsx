"use client";

import { useState, useEffect } from "react";
import PieChartComponent from "@/components/PieChart";
import BarGraphComponent from "@/components/BarChart";

export default function DashboardPage() {
  const [pieData, setPieData] = useState({ meal: "breakfast", range: "today" });
  const [layoutConfig, setLayoutConfig] = useState({
    isWideScreen: true,
  });

 
  useEffect(() => {
    const handleResize = () => {
      setLayoutConfig({ isWideScreen: window.innerWidth >= 1024 });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPieData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="h-screen bg-[#f5f5f4] flex flex-col items-center justify-start px-6 py-4">
      
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 text-center">
        Dashboard
      </h1>

     
      <div
        className={`w-full max-w-6xl grid gap-4 h-[90vh] ${
          layoutConfig.isWideScreen ? "grid-cols-12" : "grid-cols-1"
        }`}
      >
        
        <div
          className={`bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col justify-start ${
            layoutConfig.isWideScreen ? "col-span-4" : "col-span-1"
          }`}
        >
          <h2 className="text-md md:text-lg font-semibold text-emerald-600 mb-3">
            Meal Consumption
          </h2>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
            <select
              name="meal"
              value={pieData.meal}
              onChange={handleChange}
              className="border border-emerald-500 px-2 py-1 md:px-3 md:py-2 rounded-md focus:ring-emerald-500 focus:border-emerald-600 text-sm"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>

            <select
              name="range"
              value={pieData.range}
              onChange={handleChange}
              className="border border-emerald-500 px-2 py-1 md:px-3 md:py-2 rounded-md focus:ring-emerald-500 focus:border-emerald-600 text-sm"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="past7">Past 7 days</option>
              <option value="past30">Past 30 days</option>
            </select>
          </div>

          <div className="flex justify-center flex-grow">
            <PieChartComponent meal={pieData.meal} range={pieData.range} />
          </div>
        </div>

       
        <div
          className={`bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col justify-start ${
            layoutConfig.isWideScreen ? "col-span-8" : "col-span-1"
          }`}
        >
          <h2 className="text-md md:text-lg font-semibold text-emerald-600 mb-3">
            Overall Trends
          </h2>
          <div className="w-full overflow-hidden flex-grow">
            <BarGraphComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
