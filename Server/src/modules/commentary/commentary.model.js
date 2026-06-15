import { Schema, model } from "mongoose";

export const CommentaryType = {
  NORMAL: "NORMAL",
  FOUR: "FOUR",
  SIX: "SIX",
  WICKET: "WICKET",
  MILESTONE: "MILESTONE",
};

const commentarySchema = new Schema(
  {
    matchId: { type: Schema.Types.ObjectId, ref: "Match", required: true },
    over: { type: Number, required: true, min: 0 },
    ball: { type: Number, required: true, min: 1, max: 6 },
    text: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(CommentaryType),
      default: CommentaryType.NORMAL,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

commentarySchema.index({ matchId: 1, createdAt: -1 });

const CommentaryModel = model("Commentary", commentarySchema);

export default CommentaryModel;
