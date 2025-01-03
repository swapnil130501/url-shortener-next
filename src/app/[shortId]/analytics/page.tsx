'use client';
import { useEffect, useState } from 'react';

interface AnalyticsData {
    totalClicks: number;
    visitHistory: { timeStamp: number }[];
}

function AnalyticsPage({ params }: { params: { shortId: string } }) {
    const { shortId } = params;
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAnalytics() {
            try {
                const response = await fetch(`/api/${shortId}/analytics`);
                if (!response.ok) {
                    throw new Error('Failed to fetch analytics');
                }
                const data = await response.json();
                setAnalytics(data);
            } catch (err: any) {
                setError(err.message);
            }
        }

        fetchAnalytics();
    }, [shortId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!analytics) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Analytics</h1>
            <p>Total Clicks: {analytics.totalClicks}</p>
            <h2 className="text-lg font-semibold mt-4">Visit History:</h2>
            <ul className="list-disc list-inside">
                {analytics.visitHistory.map((visit, index) => (
                    <li key={index}>
                        {new Date(visit.timeStamp).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AnalyticsPage;
