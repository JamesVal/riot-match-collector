const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const environment_vars = require('../environment/environment-secret');
const uri = environment_vars.mongoDbURI;

/* POST api listing. */
router.post('/', (req, res) => {
  res.send('post api works');
});

router.post('/add_new_data', (req, res) => {
  //console.log(req);
  console.log(req.body.tableData);
  let client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    let collection = client.db("inventory_items").collection("all_items");
    collection.insertMany(req.body.tableData)
    .then((result) => {
      console.log(result);
      res.send("add new data");
    });
    client.close();
  });
});

router.post('/update_data', (req, res) => {
  //console.log(req);
  console.log(req.body.tableData);
  res.send("update data");
  /*
  let client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    let collection = client.db("inventory_items").collection("all_items");
    let collectionData = collection.find({}).toArray();
    collectionData.then((data) => {
      res.send(JSON.stringify({"all_items": data}));
    });
    client.close();
  });
*/
});

router.post('/delete_data', (req, res) => {
  //console.log(req);
  console.log(req.body.tableData);
  res.send("delete data");
  let client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    let collection = client.db("inventory_items").collection("all_items");
    /*
    collection.deleteMany({
      "item": "postcard"
    }).then((result) => {
      
    });
    client.close();
    */
  });
});

router.post('/delete_all_data', (req, res) => {
  //console.log(req);
  console.log(req.body.tableData);
  let client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    let collection = client.db("inventory_items").collection("all_items");
    collection.deleteMany({})
    .then((result) => {
      res.send("delete all data");
      console.log(result);  
    });
    client.close();
  });
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('get api works');
});

router.get('/get_all_data', (req, res) => {
  let client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    let collection = client.db("inventory_items").collection("all_items");
    let collectionData = collection.find({}).toArray();
    collectionData.then((data) => {
      res.send(JSON.stringify({"all_items": data}));
    });
    client.close();
  });
});

module.exports = router;