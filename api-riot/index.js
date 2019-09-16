var riotKey = require('./riotsecret');

// declare axios for making http requests
const axios = require('axios');
const { Observable } = require('rxjs');
const API = 'https://na1.api.riotgames.com';

function riotApi() {

}

riotApi.prototype.getSummonerDetails = function(name) {
  return new Observable((observer) => {
    axios.get(`${API}/lol/summoner/v4/summoners/by-name/${name}?api_key=${riotKey.mykey}`)
      .then(posts => {
        observer.next(posts.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        console.log(error)
      });
  });
}

riotApi.prototype.getMatchlist = function(accountId) {
  const queueId = 450;
  const beginIndex = 0;

  return new Observable((observer) => {
    axios.get(`${API}/lol/match/v4/matchlists/by-account/${accountId}?api_key=${riotKey.mykey}&queue=${queueId}&beginIndex=${beginIndex}`)
      .then(posts => {
        observer.next(posts.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        console.log(error)
      });
  });
}

riotApi.prototype.getAllMatchData = function(matchList) {
  let maxMatch = matchList.length;

  if (maxMatch > 5) maxMatch = 5;

  return new Observable((observer) => {
    for (let i = 0; i < maxMatch; i++) {
      observer.next(this.getMatchData(matchList[i].gameId));
    }
    observer.complete();
  });
}

riotApi.prototype.getMatchData = function(matchId) {
  return new Observable((observer) => {
    axios.get(`${API}/lol/match/v4/matches/${matchId}?api_key=${riotKey.mykey}`)
      .then(posts => {
        observer.next(posts.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        console.log(error)
      });
    });
}

/*

  const accountId = req.params.accountId;
  

  const accountId = req.params.accountId;
  const beginIndex = req.query.beginIndex;
  const endIndex = req.query.endIndex;
  
  axios.get(`${API}/lol/match/v3/matchlists/by-account/${accountId}?api_key=${riotKey.mykey}&beginIndex=${beginIndex}&endIndex=${endIndex}`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });

*/
/*
// Because the Riot API is heavily rate limited for Static Data, don't use it
router.get('/riotAPI/getChampion/:championId', (req, res) => {
  const championId = req.params.championId;
  
  axios.get(`${API}/lol/static-data/v3/champions/${championId}?api_key=${riotKey.mykey}&tags=image`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});
*/

module.exports = riotApi;
