import { Schema, model, models } from 'mongoose';

const urlSchema = new Schema(
    {
        shortId: { type: String, required: true, unique: true },
        redirectURL: { type: String, required: true },
        visitHistory: [
        {
            timeStamp: { type: Number },
        },
        ],
    },
    { timestamps: true }
);

export interface IUrl extends Document {
    shortId: string;
    redirectURL: string;
    visitHistory: IVisitHistory[];
}

export interface IVisitHistory {
    timeStamp: number;
}

const URL = models.URL || model<IUrl>('URL', urlSchema);

export default URL;
