import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const db = await connectToDB();

    const result = await db.collection("images").insertOne({
      name: file.name,
      data: buffer,
      contentType: file.type,
      uploadedAt: new Date(),
      category: "fruit-card",
    });

    return NextResponse.json({ message: "✅ Image uploaded successfully", id: result.insertedId });
  } catch (error: unknown) {
    let message = "❌ Upload failed";
    if (error instanceof Error) {
      console.error("Upload error:", error.message);
      message = error.message;
    } else {
      console.error("Unexpected error:", error);
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
