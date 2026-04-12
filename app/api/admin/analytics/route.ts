import { NextRequest, NextResponse } from "next/server";
import { Analytics, ChangeMessages, Notes, VisitsCounter } from "@/models/AllModels";
import connectDb from "@/lib/db";

function isAuthed(req: NextRequest) {
  return req.cookies.get("admin_auth")?.value === "true";
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDb();

  const visitsPromise = VisitsCounter.findOne().lean();
  const analyticsPromise = Analytics.find().sort({ createdAt: -1 }).limit(200).lean();
  const changeMessagesPromise = ChangeMessages.find().sort({ createdAt: -1 }).limit(50).lean();
  const notesPromise = Notes.find().sort({ createdAt: -1 }).limit(50).lean();
  const totalsPromise = Promise.all([
    Analytics.countDocuments(),
    ChangeMessages.countDocuments(),
    Notes.countDocuments(),
  ]).then(([analyticsTotal, changeMessagesTotal, notesTotal]) => ({
    analyticsTotal,
    changeMessagesTotal,
    notesTotal,
  }));

  const [visits, analytics, changeMessages, notes, totals] = await Promise.all([
    visitsPromise,
    analyticsPromise,
    changeMessagesPromise,
    notesPromise,
    totalsPromise,
  ]);

  return NextResponse.json({
    visits: visits?.count ?? 0,
    analytics,
    changeMessages,
    notes,
    totals,
  });
}
