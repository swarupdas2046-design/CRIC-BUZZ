import CommentaryModel from "./commentary.model.js";

export default class CommentaryRepository {
  async create(payload) {
    return await CommentaryModel.create(payload);
  }

  async findById(id) {
    return await CommentaryModel.findById(id);
  }

  async findByMatch(matchId, page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    const items = await CommentaryModel.find({ matchId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
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

  async deleteById(id) {
    return await CommentaryModel.findByIdAndDelete(id);
  }
}
