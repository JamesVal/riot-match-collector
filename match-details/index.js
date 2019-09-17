function KDA() {
  this.kills = 0;
  this.deaths = 0;
  this.assists = 0;
}

function TeamDetails() {
  this.teamId = 0
  this.teamMembers = [];
}

function MatchDetails() {
  this.date = null;
  this.championId = null;
  this.kda = new KDA();
  this.teamDetails = [];
  this.result = "";
}

module.exports = { 
  KDA: KDA,
  TeamDetails: TeamDetails,
  MatchDetails: MatchDetails
}