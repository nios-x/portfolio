import { NextRequest, NextResponse } from "next/server";
import { ChangeMessages } from "@/models/AllModels";
import connectDb from "@/lib/db";

function isAuthed(req: NextRequest) {
  return req.cookies.get("admin_auth")?.value === "true";
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDb();

  const changeMessages = await ChangeMessages.find().sort({ createdAt: -1 }).limit(100).lean();
  return NextResponse.json({ changeMessages });
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDb();

  const { message } = await req.json().catch(() => ({ message: "" }));
  if (!message || typeof message !== "string") {
    return NextResponse.json({ message: "Message is required" }, { status: 400 });
  }

  const changeMessage = await ChangeMessages.create({ message });
  return NextResponse.json({ changeMessage });
}
