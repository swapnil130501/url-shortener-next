import mongoose, { Schema, model, models } from 'mongoose';

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

const URL = models.URL || model('URL', urlSchema);

export default URL;
