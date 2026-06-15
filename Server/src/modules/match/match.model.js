import { Schema, model } from "mongoose";

export const MatchStatus = {
  UPCOMING: "UPCOMING",
  LIVE: "LIVE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

const matchSchema = new Schema(
  {
    series: { type: Schema.Types.ObjectId, ref: "Series", required: true },
    teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
    startAt: { type: Date },
    status: {
      type: String,
      enum: Object.values(MatchStatus),
      default: MatchStatus.UPCOMING,
    },
    winner: { type: Schema.Types.ObjectId, ref: "Team" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const MatchModel = model("Match", matchSchema);

export default MatchModel;
