import { NextRequest, NextResponse } from "next/server";
import { Notes } from "@/models/AllModels";
import connectDb from "@/lib/db";

function isAuthed(req: NextRequest) {
  return req.cookies.get("admin_auth")?.value === "true";
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDb();

  const notes = await Notes.find().sort({ createdAt: -1 }).limit(100).lean();
  return NextResponse.json({ notes });
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDb();

  const { content } = await req.json().catch(() => ({ content: "" }));
  if (!content || typeof content !== "string") {
    return NextResponse.json({ message: "Content is required" }, { status: 400 });
  }

  const note = await Notes.create({ content });
  return NextResponse.json({ note });
}
