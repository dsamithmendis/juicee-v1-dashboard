import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const file = data.get("file") as File;
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const price = data.get("price") as string;

    if (!file || !title || !description || !price) {
      return NextResponse.json(
        { error: "All fields (title, description, price, file) are required." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const db = await connectToDB();
    await db.collection("images").insertOne({
      title,
      description,
      price: parseFloat(price),
      name: file.name,
      data: buffer,
      contentType: file.type,
      uploadedAt: new Date(),
      category: "juice-card",
    });

    return NextResponse.json({ message: "✅ Image uploaded successfully" });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "❌ Upload failed" }, { status: 500 });
  }
}
