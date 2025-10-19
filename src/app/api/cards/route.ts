import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

interface ImageDoc {
  _id: ObjectId;
  name: string;
  title: string;
  description: string;
  price: number;
  contentType: string;
  data: Buffer;
  uploadedAt: Date;
}

export async function GET() {
  try {
    const db = await connectToDB();
    const images = await db.collection<ImageDoc>("images").find().toArray();

    const formatted = images.map((img) => ({
      _id: img._id.toString(),
      name: img.name,
      title: img.title,
      description: img.description,
      price: img.price,
      contentType: img.contentType,
      base64: `data:${img.contentType};base64,${img.data.toString("base64")}`,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
