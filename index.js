const { of, pipe, concat } = require('rxjs');
const { concatMap, concatAll, exhaustMap } = require('rxjs/operators');
const { forkJoin } = require('rxjs/index');
const api_riot = require('./api-riot');
const api_db = require('./api-db');
const match_creator = require('./match-creator');
const environment_vars = require('./environment/environment-secret');

var userToTrack = environment_vars.userToTrack;
var riotApi = new api_riot();
var mongoDbApi = new api_db();
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
  concatMap((data) => {
    return forkJoin(data);
  }),
  concatMap((data) => {
    matchData = data; 
    let matchesDataToWrite = [];
    for (let i = 0; i < matchData.length; i++) {
      let newMatch = match_creator.createMatchDetails(summonerDetails, matchData[0]);
      matchesDataToWrite.push(newMatch);
    }
    return mongoDbApi.addNewData(matchesDataToWrite);
  })
).subscribe({
  next: (data) => {
    console.log(data);
  },
  complete: () => {
    console.log("done.");
  },
  error: (err) => {
    console.log(err);
  }
});

