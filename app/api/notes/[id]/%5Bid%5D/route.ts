import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Notes, NotePassword } from "@/models/AllModels";
import connectDb from "@/lib/db";

function hashPassword(pw: string) {
  return crypto.createHash("sha256").update(pw).digest("hex");
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  await connectDb();
  const note = await Notes.findById(params.id).lean();
  if (!note) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json({ note });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDb();

  const { content, password } = await req.json().catch(() => ({ content: "", password: "" }));
  if (!content) return NextResponse.json({ message: "content required" }, { status: 400 });

  const pwDoc = await NotePassword.findOne();
  if (!pwDoc) return NextResponse.json({ message: "password not set" }, { status: 400 });
  if (pwDoc.hash !== hashPassword(password || "")) {
    return NextResponse.json({ message: "invalid password" }, { status: 401 });
  }

  const note = await Notes.findById(params.id);
  if (!note) return NextResponse.json({ message: "Not found" }, { status: 404 });
  note.content = content;
  await note.save();
  return NextResponse.json({ ok: true, note });
}
