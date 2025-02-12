import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("hosteldata");
    const collection = db.collection("students");

    // Extract query parameters
    const url = new URL(req.url);
    const date = url.searchParams.get("date");

    // Define query filter
    const query = date ? { date: date } : {};

    // Fetch filtered students data
    const students = await collection.find(query).toArray();

    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
