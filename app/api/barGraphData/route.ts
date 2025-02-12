import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { subDays, format } from "date-fns";

export async function GET() {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("hosteldata");
    const collection = db.collection("students");

    // Get the past 7 days including today
    const today = new Date();
    const past7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(today, 6 - i); // Reverse order to ensure oldest first
      return {
        date: format(date, "yyyy-MM-dd"), // Format date as YYYY-MM-DD
        day: format(date, "EEEE"), // Get the day name (e.g., Monday)
      };
    });

    // Fetch aggregated data from MongoDB
    const mealData = await collection
      .aggregate([
        {
          $match: {
            date: { $gte: past7Days[0].date }, // Get records from last 7 days
          },
        },
        {
          $group: {
            _id: "$date",
            breakfast: { $sum: "$breakfast" },
            lunch: { $sum: "$lunch" },
            dinner: { $sum: "$dinner" },
          },
        },
        { $sort: { _id: 1 } }, // Sort by date (ascending order)
      ])
      .toArray();

    // Convert MongoDB output to the desired format
    const result = past7Days.map(({ date, day }) => {
      const data = mealData.find((entry) => entry._id === date) || {
        breakfast: 0,
        lunch: 0,
        dinner: 0,
      };
      return { date, day, ...data };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching meal data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
