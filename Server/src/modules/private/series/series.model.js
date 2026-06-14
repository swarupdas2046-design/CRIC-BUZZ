import { Schema, model } from "mongoose";

export const SeriesStatus = {
  UPCOMING: "UPCOMING",
  LIVE: "LIVE",
  COMPLETED: "COMPLETED",
};

const seriesSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    shortName: { type: String, trim: true },
    season: { type: String, required: true, trim: true, unique: true },
    status: {
      type: String,
      enum: Object.values(SeriesStatus),
      default: SeriesStatus.UPCOMING,
    },
    logo: { type: String },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

const SeriesModel = model("Series", seriesSchema);

export default SeriesModel;
