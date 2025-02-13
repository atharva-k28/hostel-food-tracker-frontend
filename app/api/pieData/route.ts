import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { subDays, format } from "date-fns";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const meal = url.searchParams.get("meal");
    const range = url.searchParams.get("range");

    // Validate meal type
    const validMeals = ["breakfast", "lunch", "dinner"];
    if (!meal || !validMeals.includes(meal)) {
      return NextResponse.json({ error: "Invalid meal type" }, { status: 400 });
    }

    // Define allowed ranges
    const allowedRanges: Record<string, number> = {
      today: 0,
      yesterday: 1,
      past7: 7,
      past30: 30,
    };

    if (!range || !(range in allowedRanges)) {
      return NextResponse.json(
        { error: "Invalid range. Use today, yesterday, past7, or past30." },
        { status: 400 }
      );
    }

    // Compute start date based on range
    const days = allowedRanges[range]; // Number of days in range
    const startDate = format(subDays(new Date(), days), "yyyy-MM-dd");

    const client = await clientPromise;
    const db = client.db("hosteldata");
    const collection = db.collection("students");

    //Get SUM of all meal counts in the past X days**
    const mealAggregation = await collection
      .aggregate([
        { $match: { date: { $gte: startDate } } }, // Filter by date range
        { $group: { _id: "$date", mealCount: { $sum: `$${meal}` } } }, // Sum up meal count per day
      ])
      .toArray();

    //Sum up the meal count across all valid days
    const totalMealCount = mealAggregation.reduce((sum, day) => sum + day.mealCount, 0);

    //Count unique students per day**
    const studentAggregation = await collection
      .aggregate([
        { $match: { date: { $gte: startDate } } },
        { $group: { _id: "$date", studentCount: { $sum: 1 } } }
      ])
      .toArray();

    //Get number of valid days with data      / / / 
    const daysWithData = studentAggregation.length;

    //Total expected students = total students per day × valid days**
    const uniqueStudents = await collection.distinct("prn");
    const totalStudentsPerDay = uniqueStudents.length; // Assuming total students per day is constant

    const expectedTotalStudents = totalStudentsPerDay * daysWithData;

    return NextResponse.json({
      meal,
      range,
      count: totalMealCount, // Sum of meal counts in the last X days
      totalStudents: expectedTotalStudents, // Corrected total students count
    });
  } catch (error) {
    console.error("Error fetching meal data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
