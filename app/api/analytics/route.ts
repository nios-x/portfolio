import { NextRequest, NextResponse } from "next/server";
import { Analytics } from "@/models/AllModels";
import connectDb from "@/lib/db";

type DeviceInfo = {
  type?: string;
  os?: string;
  browser?: string;
};

function parseUserAgent(userAgent: string): DeviceInfo {
  const ua = userAgent.toLowerCase();
  const isMobile = /mobile|android|iphone|ipad/.test(ua);
  let os = "";
  if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("mac os")) os = "macOS";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("iphone") || ua.includes("ipad")) os = "iOS";
  else if (ua.includes("linux")) os = "Linux";

  let browser = "";
  if (ua.includes("edg")) browser = "Edge";
  else if (ua.includes("chrome")) browser = "Chrome";
  else if (ua.includes("safari")) browser = "Safari";
  else if (ua.includes("firefox")) browser = "Firefox";

  return {
    type: isMobile ? "mobile" : "desktop",
    os,
    browser,
  };
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const body = await req.json().catch(() => ({}));
    const userAgent = req.headers.get("user-agent") ?? "";
    const forwarded = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "";
    const ip = (typeof body.ip === "string" && body.ip) || forwarded.split(",")[0]?.trim() || "unknown";

    const page = typeof body.page === "string" ? body.page : "/";
    const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
    const referrer = typeof body.referrer === "string" ? body.referrer : req.headers.get("referer") ?? "";

    const location = {
      country: (body as { country?: string }).country || req.headers.get("x-vercel-ip-country") || "",
      city: (body as { city?: string }).city || req.headers.get("x-vercel-ip-city") || "",
    };

    await Analytics.create({
      sessionId,
      ip,
      userAgent,
      device: parseUserAgent(userAgent),
      location,
      page,
      referrer,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error logging analytics", error);
    return NextResponse.json({ ok: false, error: "Failed to log analytics" }, { status: 500 });
  }
}
