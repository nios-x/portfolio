import { VisitsCounter } from "@/models/AllModels";
import connectDb from "@/lib/db";

export async function GET() {
  try {
    await connectDb();

    let counter = await VisitsCounter.findOne();
    if (!counter) {
      counter = new VisitsCounter();
    }
    counter.count += 1;
    await counter.save();

    return new Response(JSON.stringify({ count: counter.count }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating visit count:", error);
    return new Response(JSON.stringify({ error: "Failed to update visit count" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
