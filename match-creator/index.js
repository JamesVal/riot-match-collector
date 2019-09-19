const MD = require('../match-details');
const MatchDetails = MD.MatchDetails;
const TeamDetails = MD.TeamDetails;
const KDA = MD.KDA;

function MatchCreator() {

}

MatchCreator.prototype.getTeamMembers = function(teamId, matchData) {
  var teamMembers = [];
  
  for (var eachParticipantIdx = 0; eachParticipantIdx < matchData.participants.length; eachParticipantIdx++) {
    if (teamId == matchData.participants[eachParticipantIdx].teamId) {
      var partipantname = this.getParticipantName(matchData.participants[eachParticipantIdx].participantId, matchData);
      teamMembers.push(partipantname);
    }
  }
  
  return teamMembers;
}
  
MatchCreator.prototype.getTeamNumbers = function(matchData) {
  var teamNumbers = [];
  
  for (var eachTeamIdx = 0; eachTeamIdx < matchData.teams.length; eachTeamIdx++) {
    teamNumbers.push(matchData.teams[eachTeamIdx].teamId);
  }
  
  return teamNumbers;
}

MatchCreator.prototype.getTeamDetails = function(matchData) {
  let teamDetails = [];
  let teamNumbers = [];
  teamNumbers = this.getTeamNumbers(matchData);            
  for (var eachTeamIdx = 0; eachTeamIdx < teamNumbers.length; eachTeamIdx++) {
    var team = new TeamDetails();
    team.teamId = teamNumbers[eachTeamIdx];
    team.teamMembers = this.getTeamMembers(teamNumbers[eachTeamIdx], matchData);
    teamDetails.push(team);
  }

  return teamDetails;
}

MatchCreator.prototype.getSummonerParticipantId = function(id, matchData) {
  for (var eachParticipantIdx = 0; eachParticipantIdx < matchData.participantIdentities.length; eachParticipantIdx++) {
    if (id == matchData.participantIdentities[eachParticipantIdx].player.summonerId) {
      return matchData.participantIdentities[eachParticipantIdx].participantId;
    }
  }
}

MatchCreator.prototype.getSummonerChampionId = function(participantId, matchData) {
    return matchData.participants[participantId-1].championId;
}

MatchCreator.prototype.getParticipantKDA = function(participantId, matchData) {
  var kda = new KDA();
  
  for (var eachParticipantIdx = 0; eachParticipantIdx < matchData.participants.length; eachParticipantIdx++) {
    if (participantId == matchData.participants[eachParticipantIdx].participantId) {
      kda.kills = matchData.participants[eachParticipantIdx].stats.kills;
      kda.deaths = matchData.participants[eachParticipantIdx].stats.deaths;
      kda.assists = matchData.participants[eachParticipantIdx].stats.assists;
    }
  }
  
  return kda;
}

MatchCreator.prototype.getMatchResult = function(participantId, matchData) {
  return matchData.participants[participantId-1].stats.win;
}

MatchCreator.prototype.getParticipantName = function(participantId, matchData) {
  return matchData.participantIdentities[participantId-1].player.summonerName;
}
    
MatchCreator.prototype.createMatchDetails = function(summonerDetails, matchData) {
  var participantId = this.getSummonerParticipantId(summonerDetails.id, matchData);
  var championId = this.getSummonerChampionId(participantId, matchData);
  var curData = new MatchDetails();

  curData.teams = this.getTeamDetails(matchData);
  curData.date = matchData.gameCreation;
  curData.gameMode = matchData.gameMode;
  curData.championId = championId;
  /*
  curData.championName = "";
  curData.championImg = "";
  */
  curData.kda = this.getParticipantKDA(participantId, matchData);
  
  var result = this.getMatchResult(participantId, matchData);
  if (result) {
    curData.result = "Win";
  } else {
    curData.result = "Loss";
  }
         
  return curData;
}

module.exports = new MatchCreator();