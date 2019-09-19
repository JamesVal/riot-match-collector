const MongoClient = require('mongodb').MongoClient;
const { Observable } = require('rxjs');
const environment_vars = require('../environment/environment-secret');
const uri = environment_vars.mongoDbURI;
const db_name = "match_data";
const table_name = "matches";

function mongoDBApi() {

}

mongoDBApi.prototype.addNewData = function (tableDataArray) {
  return new Observable((observer) => {
    let client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});
    client.connect(err => {
      let collection = client.db(db_name).collection(table_name);
      collection.insertMany(tableDataArray)
      .then((result) => {
        observer.next(result);
        return client.close();
      })
      .then((result) => {
        observer.complete();
      })
      .catch((err) => {
        observer.error(err);
        client.close();
      });
    });
  });
}
/*
router.post('/update_data', (req, res) => {
  //console.log(req);
  console.log(req.body.tableData);
  res.send("update data");
*/
  /*
  let client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    let collection = client.db(db_name).collection(table_name);
    let collectionData = collection.find({}).toArray();
    collectionData.then((data) => {
      res.send(JSON.stringify({table_name: data}));
    });
    client.close();
  });
*/
/*
});
*/

/*
router.post('/delete_data', (req, res) => {
  //console.log(req);
  console.log(req.body.tableData);
  res.send("delete data");
  let client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    let collection = client.db(db_name).collection(table_name);
*/
    /*
    collection.deleteMany({
      "item": "postcard"
    }).then((result) => {
      
    });
    client.close();
    */
/*
  });
});
*/
/*
router.post('/delete_all_data', (req, res) => {
  //console.log(req);
  console.log(req.body.tableData);
  let client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    let collection = client.db(db_name).collection(table_name);
    collection.deleteMany({})
    .then((result) => {
      res.send("delete all data");
      console.log(result);  
    });
    client.close();
  });
});
*/
/* GET api listing. */
/*
router.get('/', (req, res) => {
  res.send('get api works');
});

router.get('/get_all_data', (req, res) => {
  let client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    let collection = client.db(db_name).collection(table_name);
    let collectionData = collection.find({}).toArray();
    collectionData.then((data) => {
      res.send(JSON.stringify({table_name: data}));
    });
    client.close();
  });
});
*/

module.exports = mongoDBApi;