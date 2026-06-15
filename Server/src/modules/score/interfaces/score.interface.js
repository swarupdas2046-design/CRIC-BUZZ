export default class ScoreInterface {
  constructor({
    matchId,
    innings,
    battingTeam,
    score,
    wickets,
    overs,
    runRate,
    target,
    createdBy,
    updatedBy,
  }) {
    this.matchId = matchId;
    this.innings = innings;
    this.battingTeam = battingTeam;
    this.score = score;
    this.wickets = wickets;
    this.overs = overs;
    this.runRate = runRate;
    this.target = target;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
