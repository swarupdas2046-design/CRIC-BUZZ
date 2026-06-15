export default class ScoreDto {
  constructor({
    _id,
    matchId,
    innings,
    battingTeam,
    score,
    wickets,
    overs,
    runRate,
    target,
  }) {
    this._id = _id;
    this.matchId = matchId;
    this.innings = innings;
    this.battingTeam = battingTeam;
    this.score = score;
    this.wickets = wickets;
    this.overs = overs;
    this.runRate = runRate;
    this.target = target;
  }
}
