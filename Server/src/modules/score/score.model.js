import { Schema, model } from "mongoose";

const scoreSchema = new Schema(
  {
    matchId: { type: Schema.Types.ObjectId, ref: "Match", required: true },
    innings: { type: Number, required: true },
    battingTeam: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    score: { type: Number, required: true, min: 0 },
    wickets: { type: Number, required: true, min: 0, max: 10 },
    overs: { type: String, required: true },
    runRate: { type: Number, required: true },
    target: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

scoreSchema.index({ matchId: 1, innings: 1 }, { unique: true });

const ScoreModel = model("Score", scoreSchema);

export default ScoreModel;
