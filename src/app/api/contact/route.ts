import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();

    const { error } = await supabase.from("contacts").insert({
      name,
      email,
      subject: subject || "New Contact",
      message,
      metadata: {
        ip: request.headers.get("x-forwarded-for") || null,
        user_agent: request.headers.get("user-agent") || null,
      },
    });

    if (error) throw error;

    // In production, send email notification here
    // await sendEmailNotification({ name, email, subject, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 });
  }
}
