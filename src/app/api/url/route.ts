import { NextResponse } from "next/server";

import URL from "../../../models/url";
import dbConnect from "@/app/lib/connectDB";

export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();
        const { url } = body;

        const shortId = Math.random().toString(36).substring(2, 8);
        const payload = {
            shortId: shortId,
            redirectURL: url,
            visitHistory: [],
        };
        const result = await URL.create(payload);
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error("Error creating short URL:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
