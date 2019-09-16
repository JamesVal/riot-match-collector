const { of } = require('rxjs');
const { concatMap, concatAll } = require('rxjs/operators');

const api_riot = require('./api-riot');
const match_details = require('./match-details');

var riotApi = new api_riot();
var matchData = [];

riotApi.getSummonerDetails("shuntstick").pipe(
  concatMap((data) => {
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
  },
  error: (err) => {
    console.log(err);
  }
});

var md = new match_details();

md.championId = "hey";

console.log(md);

/*
riotApi.getMatchData(3108638201).subscribe((data) => {
  console.log(data);
})
*/

