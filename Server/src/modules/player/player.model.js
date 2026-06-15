import { Schema, model } from "mongoose";

export const PlayerRole = {
  BATSMAN: "BATSMAN",
  BOWLER: "BOWLER",
  ALL_ROUNDER: "ALL_ROUNDER",
  WICKET_KEEPER: "WICKET_KEEPER",
};

const playerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String },
    role: { type: String, enum: Object.values(PlayerRole), required: true },
    country: { type: String, required: true, trim: true },
    battingStyle: { type: String, trim: true },
    bowlingStyle: { type: String, trim: true },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

const PlayerModel = model("Player", playerSchema);

export default PlayerModel;
