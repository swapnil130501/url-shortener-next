import { NextResponse } from 'next/server';
import URL from '@/models/url';
import dbConnect from '@/app/lib/connectDB';

export async function GET(req: Request, { params }: { params: { shortId: string } }) {
    try {
        await dbConnect();
        
        const shortId = params.shortId;
        console.log('Short ID:', shortId);

        const urlDoc = await URL.findOne({ shortId });
        if (!urlDoc) {
            return NextResponse.json(
                { error: 'Short URL not found' }, 
                { status: 404 }
            );
        }

        console.log('URL Document:', urlDoc);

        const analytics = {
            totalClicks: urlDoc.visitHistory.length,
            visitHistory: urlDoc.visitHistory,
        };

        return NextResponse.json(analytics, { status: 200 });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
