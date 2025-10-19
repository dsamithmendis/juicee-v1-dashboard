import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";

export async function GET() {
  const db = await connectToDB();
  const images = await db.collection("images").find().toArray();

  // Convert binary data to Base64 for browser display
  const formatted = images.map((img) => ({
    _id: img._id.toString(),
    name: img.name,
    contentType: img.contentType,
    base64: `data:${img.contentType};base64,${img.data.toString("base64")}`,
  }));

  return NextResponse.json(formatted);
}