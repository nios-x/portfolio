import { NextRequest, NextResponse } from "next/server";
import { Notes, NotePassword } from "@/models/AllModels";
import connectDb from "@/lib/db";
import crypto from "crypto";

function isAuthed(req: NextRequest) {
  return req.cookies.get("admin_auth")?.value === "true";
}

function hashPassword(pw: string) {
  return crypto.createHash("sha256").update(pw).digest("hex");
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthed(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDb();
  const { content, password } = await req.json().catch(() => ({ content: "", password: "" }));
  if (!content) return NextResponse.json({ message: "Content is required" }, { status: 400 });

  const pwDoc = await NotePassword.findOne();
  if (!pwDoc) return NextResponse.json({ message: "Password not set" }, { status: 400 });
  if (pwDoc.hash !== hashPassword(password || "")) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  const note = await Notes.findById(params.id);
  if (!note) return NextResponse.json({ message: "Not found" }, { status: 404 });
  note.content = content;
  await note.save();
  return NextResponse.json({ ok: true, note });
}
