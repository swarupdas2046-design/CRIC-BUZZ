export default class CommentaryDto {
  constructor({ _id, matchId, over, ball, text, type, createdAt, updatedAt }) {
    this._id = _id;
    this.matchId = matchId;
    this.over = over;
    this.ball = ball;
    this.text = text;
    this.type = type;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
