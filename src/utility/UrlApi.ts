import axios from 'axios';
import { URLData, AnalyticsData } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const shortenURL = async (redirectURL: string): Promise<URLData> => {
    const response = await axios.post(`${API_BASE_URL}/url`, { redirectURL });
    return response.data;
};

export const getAnalytics = async (shortId: string): Promise<AnalyticsData> => {
    const response = await axios.get(`${API_BASE_URL}/analytics`, { params: { shortId } });
    return response.data;
};
