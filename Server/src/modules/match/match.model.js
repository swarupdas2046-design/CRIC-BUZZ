import { Schema, model } from "mongoose";

const matchSchema = new Schema(
  {
    series: { type: Schema.Types.ObjectId, ref: "Series", required: true },
    teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
    startAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const MatchModel = model("Match", matchSchema);

export default MatchModel;
