import { Schema, model } from "mongoose";

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    shortName: { type: String, required: true, trim: true, unique: true },
    logo: { type: String, required: true, trim: true },
    primaryColor: { type: String, trim: true },
    squadPlayers: [{ type: Schema.Types.ObjectId, ref: "Player", default: [] }],
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

const TeamModel = model("Team", teamSchema);

export default TeamModel;
