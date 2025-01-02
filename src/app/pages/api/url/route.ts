import { NextResponse } from "next/server";

import URL from "../../../../models/url";
import { connectToDatabase } from "@/db/db-config";

// POST request to create a short URL
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { redirectURL } = body;

    if (!redirectURL) {
      return NextResponse.json({ error: "Missing redirectURL in request body" }, { status: 400 });
    }

    const shortId = Math.random().toString(36).substring(2, 8);

    const newUrl = await URL.create({ shortId, redirectURL, visitHistory: [] });

    return NextResponse.json(newUrl, { status: 201 });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
