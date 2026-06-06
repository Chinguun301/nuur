import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event_type, page, referrer } = body;

    if (!event_type) {
      return NextResponse.json({ error: "event_type is required" }, { status: 400 });
    }

    const supabase = await createAdminClient();

    // Get client info from headers
    const userAgent = request.headers.get("user-agent") || "";
    const country = request.headers.get("cf-ipcountry") || null;
    const device = /Mobile|Android|iPhone/i.test(userAgent) ? "mobile" : "desktop";
    const browser = userAgent.includes("Chrome")
      ? "Chrome"
      : userAgent.includes("Firefox")
        ? "Firefox"
        : userAgent.includes("Safari")
          ? "Safari"
          : "Other";

    const { error } = await supabase.from("analytics").insert({
      event_type,
      page,
      country,
      device,
      browser,
      referrer,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = await createAdminClient();

    const [totalViews, uniqueVisitors, pageViews, countryStats] = await Promise.all([
      supabase.from("analytics").select("*", { count: "exact", head: true }),
      supabase
        .from("analytics")
        .select("session_id", { count: "exact", head: true })
        .not("session_id", "is", null),
      supabase
        .from("analytics")
        .select("page, count")
        .order("created_at", { ascending: false })
        .limit(10),
      supabase
        .from("analytics")
        .select("country, count")
        .not("country", "is", null)
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

    // Aggregate counts per page
    const { data: pageData } = await supabase.from("analytics").select("page");

    const pageCounts: Record<string, number> = {};
    pageData?.forEach((row) => {
      pageCounts[row.page] = (pageCounts[row.page] || 0) + 1;
    });

    return NextResponse.json({
      totalViews: totalViews.count,
      uniqueVisitors: uniqueVisitors.count,
      pageViews: Object.entries(pageCounts)
        .map(([page, count]) => ({ page, count }))
        .sort((a, b) => b.count - a.count),
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
