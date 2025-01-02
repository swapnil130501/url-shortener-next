export interface URLData {
    shortId: string;
    redirectURL: string;
    visitHistory: { timeStamp: number }[];
}
  
export interface AnalyticsData {
    totalClicks: number;
    visitHistory: { timeStamp: number }[];
}
  