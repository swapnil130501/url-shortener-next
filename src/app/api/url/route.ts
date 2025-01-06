import UrlService from "@/services/url-service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const urlService = new UrlService();
        const { url } = body;

        const result = await urlService.createShortUrl(url);

        return NextResponse.json({
            status: 201,
            success: true,
            message: "URL shortened successfully",
            data: result,
        });
    } catch (error: any) {
        console.error("Error creating short URL:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
