const { of } = require('rxjs');
const { concatMap, concatAll } = require('rxjs/operators');

const api_riot = require('./api-riot');
const match_creator = require('./match-creator');
const environment_vars = require('./environment/environment-secret');

var userToTrack = environment_vars.userToTrack;
var riotApi = new api_riot();
var matchData = [];
var matchDataToSave = [];
var summonerDetails;

riotApi.getSummonerDetails(userToTrack).pipe(
  concatMap((data) => {
    summonerDetails = data;
    return riotApi.getMatchlist(data.accountId);
  }),
  concatMap((data) => {
    return riotApi.getAllMatchData(data.matches);
  }),
  concatAll()
).subscribe({
  next: (data) => {
    matchData.push(data);
  },
  complete: () => {
    //console.log(matchData);
    console.log(matchData[0]);
    let newMatch = match_creator.createMatchDetails(summonerDetails, matchData[0]);
    console.log(newMatch);
  },
  error: (err) => {
    console.log(err);
  }
});


/*
riotApi.getMatchData(3108638201).subscribe((data) => {
  console.log(data);
})
*/

