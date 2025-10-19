import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

interface CardDoc {
  _id: ObjectId;
  name: string;
  title: string;
  description: string;
  price: number;
  contentType: string;
  data: Buffer;
  uploadedAt: Date;
  category: string;
}

export async function GET() {
  try {
    const db = await connectToDB();
    const cards = await db.collection<CardDoc>("cards").find().toArray();

    const formatted = cards.map((card) => ({
      _id: card._id.toString(),
      name: card.name,
      title: card.title,
      description: card.description,
      price: card.price,
      contentType: card.contentType,
      base64: `data:${card.contentType};base64,${card.data.toString("base64")}`,
      category: card.category,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching cards:", error);
    return NextResponse.json({ error: "Failed to fetch cards" }, { status: 500 });
  }
}
