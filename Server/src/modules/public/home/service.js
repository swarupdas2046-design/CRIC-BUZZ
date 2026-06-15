import HomeRepository from "./repository.js";

export default class HomeService {
  constructor() {
    this.repository = new HomeRepository();
  }

  async getHome() {
    const [liveMatches, upcomingMatches, recentMatches] = await Promise.all([
      this.repository.getLiveMatches(),
      this.repository.getUpcomingMatches(),
      this.repository.getRecentMatches(),
    ]);

    return {
      liveMatches,
      upcomingMatches,
      recentMatches,
    };
  }
}
