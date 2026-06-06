import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { query, type } = await request.json();

    // In production, use OpenAI/Anthropic API
    // For now, return basic responses
    const responses = {
      portfolio: `I'm a Front-End Developer specializing in React, Next.js, and TypeScript. I build beautiful, performant web applications. Check out my projects to see my work!`,
      project:
        "I have several featured projects including an E-Commerce Platform, AI Chat Application, and a Design System Library. Each project has a detailed case study. What would you like to know more about?",
      blog: "I write about web development, React, TypeScript, and design. My most popular articles cover building performant applications and advanced TypeScript patterns.",
      contact:
        "I'd love to hear from you! Feel free to reach out through the contact form, and I'll get back to you as soon as possible.",
    };

    let answer = responses.portfolio;

    if (type === "project" || query.toLowerCase().includes("project")) {
      answer = responses.project;
    } else if (type === "blog" || query.toLowerCase().includes("blog")) {
      answer = responses.blog;
    } else if (type === "contact" || query.toLowerCase().includes("contact")) {
      answer = responses.contact;
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("AI API error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
