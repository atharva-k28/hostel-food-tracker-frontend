import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("hosteldata");
    const collection = db.collection("students");

    // Fetch students data
    const students = await collection.find({}).toArray();

    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
