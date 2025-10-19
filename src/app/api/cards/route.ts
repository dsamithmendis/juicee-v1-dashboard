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
    return NextResponse.json(
      { error: "Failed to fetch cards" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Card ID is required" },
        { status: 400 }
      );
    }

    const db = await connectToDB();
    const result = await db
      .collection("cards")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error deleting card:", error);
    return NextResponse.json(
      { error: "Failed to delete card" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, title, description, price } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Card ID is required" },
        { status: 400 }
      );
    }

    const db = await connectToDB();

    const result = await db.collection("cards").updateOne(
      { _id: new ObjectId(id), category: "juice-card" },
      {
        $set: {
          name,
          title,
          description,
          price,
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Juice card not found or category mismatch" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Juice card updated successfully" });
  } catch (error) {
    console.error("Error updating juice card:", error);
    return NextResponse.json(
      { error: "Failed to update juice card" },
      { status: 500 }
    );
  }
}
