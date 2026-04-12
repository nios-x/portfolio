import { NextRequest, NextResponse } from "next/server";
import { Notes, NotePassword } from "@/models/AllModels";
import connectDb from "@/lib/db";
import crypto from "crypto";

function hashPassword(pw: string) {
  return crypto.createHash("sha256").update(pw).digest("hex");
}

export async function GET() {
  await connectDb();
  const notes = await Notes.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ notes });
}

export async function POST(req: NextRequest) {
  await connectDb();

  const { content, password } = await req.json().catch(() => ({ content: "", password: "" }));
  if (!content) return NextResponse.json({ message: "content required" }, { status: 400 });

  const pwDoc = await NotePassword.findOne();
  if (!pwDoc) return NextResponse.json({ message: "password not set" }, { status: 400 });
  if (pwDoc.hash !== hashPassword(password || "")) {
    return NextResponse.json({ message: "invalid password" }, { status: 401 });
  }

  const note = await Notes.create({ content });
  return NextResponse.json({ ok: true, note });
}
