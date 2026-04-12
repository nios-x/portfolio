import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { NotePassword } from "@/models/AllModels";
import connectDb from "@/lib/db";

function hashPassword(pw: string) {
  return crypto.createHash("sha256").update(pw).digest("hex");
}

export async function POST(req: NextRequest) {
  await connectDb();
  const { password, currentPassword } = await req.json().catch(() => ({ password: "", currentPassword: "" }));
  if (!password) return NextResponse.json({ message: "password required" }, { status: 400 });

  const existing = await NotePassword.findOne();

  // If no password set yet, allow bootstrap
  if (!existing) {
    await NotePassword.create({ hash: hashPassword(password) });
    return NextResponse.json({ ok: true, bootstrap: true });
  }

  if (!currentPassword || existing.hash !== hashPassword(currentPassword)) {
    return NextResponse.json({ message: "invalid current password" }, { status: 401 });
  }

  existing.hash = hashPassword(password);
  await existing.save();
  return NextResponse.json({ ok: true, changed: true });
}
