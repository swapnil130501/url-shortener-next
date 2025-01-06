import URL, { IUrl } from "@/models/url";
import dbConnect from "@/config/connectDB";

class UrlRepository {
    private urlModel;

    constructor() {
        dbConnect();
        this.urlModel = URL;
    }

    async createUrl(data: IUrl): Promise<IUrl> {
        try {
            const result = await this.urlModel.create(data);
            return result;
        } catch (error: any) {
            console.log("Something went wrong in URL repository:", error.message);
            throw error;
        } 
    }
}

export default UrlRepository;