function KDA() {
  this.kills = 0;
  this.deaths = 0;
  this.assists = 0;
}

function MatchDetails() {
  this.date = null;
  this.championId = null;
  this.kda = new KDA();
  this.result = "";
}


/*
var getSummonerParticipantId = function(id, matchData) {
  for (var eachParticipantIdx = 0; eachParticipantIdx < matchData.participantIdentities.length; eachParticipantIdx++) {
    if (id == matchData.participantIdentities[eachParticipantIdx].player.summonerId) {
      return matchData.participantIdentities[eachParticipantIdx].participantId;
    }
  }
}
*/

module.exports = MatchDetails;