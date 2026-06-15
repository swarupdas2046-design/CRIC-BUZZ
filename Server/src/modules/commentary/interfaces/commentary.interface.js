export default class CommentaryInterface {
  constructor({ matchId, over, ball, text, type, createdBy, updatedBy }) {
    this.matchId = matchId;
    this.over = over;
    this.ball = ball;
    this.text = text;
    this.type = type;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
