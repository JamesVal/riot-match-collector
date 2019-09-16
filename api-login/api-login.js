const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const utils = require('../utils');

const environment_vars = require('../environment/environment-secret');
const uri = environment_vars.mongoDbURI;

/* POST api listing. */
router.post('/', (req, res) => {
  console.log("auth post", req.body.login);
  let client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    let collection = client.db("logins").collection("all_logins");
    let collectionData = collection.find({user: req.body.login.user}).toArray();
    collectionData.then((data) => {
      if (data.length) {
        console.log("data", data);
        if (req.body.login.password === data[0].password) {
          const token = utils.getUid(256);
          res.send(JSON.stringify({"token": token, "permissions": data[0].permissions, "error": ""}));
        } else {
          res.send(JSON.stringify({"token": "", "error": "Error: Wrong username or password"}));
        }
      } else {
        res.send(JSON.stringify({"token": "", "error": "Error: Wrong username or password"}));
      }
    });
    client.close();
  });
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('get api works');
  console.log("auth get");
});

module.exports = router;