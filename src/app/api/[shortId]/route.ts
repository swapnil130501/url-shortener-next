import { NextResponse } from "next/server";
import URL from "../../../models/url";
import dbConnect from "@/config/connectDB";

export async function GET(req: Request, context: { params: { shortId: string } }) {
    try {
        await dbConnect();
        const { shortId } = await context.params;

        const response = await URL.findOne({ shortId });
        if (!response) {
            return NextResponse.json(
                { success: false, message: "Short URL not found" },
                { status: 404 }
            );
        }

        response.visitHistory.push({ timeStamp: Date.now() });
        await response.save();
        console.log(response);

        return NextResponse.redirect(response.redirectURL);
    } catch (error) {
        console.error("Error in redirect route:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
