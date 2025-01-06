import { IUrl, IVisitHistory } from "@/models/url";
import UrlRepository from "@/repository/url-repository";

class UrlService {
    private urlRepository;
    constructor() {
        this.urlRepository = new UrlRepository();
    }

    async createShortUrl(url: string) {
        try {
            const shortID = Math.random().toString(36).substring(2, 8);
            const payload: Partial<IUrl> = {
                shortId: shortID,
                redirectURL: url,
                visitHistory: [],
            };
            const result = await this.urlRepository.createUrl(payload as IUrl);
            return result;
        } catch (error: any) {
            console.log("Something went wrong in URL service:", error.message);
            throw error;
        }
    }
}

export default UrlService;