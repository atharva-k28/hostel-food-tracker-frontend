import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("hosteldata"); // Change to your database name
    const collection = db.collection("students"); // Change to your collection name

    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ message: "Invalid data format, expected an array." });
    }

    // Convert date strings to ISODate format
    const formattedData = data.map((item) => ({
      ...item,
      date: new Date(item.date), // Convert date string to JavaScript Date object
    }));

    // Insert data into MongoDB
    const result = await collection.insertMany(formattedData);

    res.status(201).json({ message: "Data inserted successfully!", insertedCount: result.insertedCount });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
