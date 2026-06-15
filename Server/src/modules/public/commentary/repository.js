import CommentaryModel from "../../commentary/commentary.model.js";

export default class PublicCommentaryRepository {
  async findByMatch(matchId, page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    const items = await CommentaryModel.find({ matchId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await CommentaryModel.countDocuments({ matchId });

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
