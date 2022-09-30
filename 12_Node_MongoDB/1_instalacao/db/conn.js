const { MongoClient } = require("mongodb");

var uri = "mongodb://0.0.0.0:27017/nomedobanco";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Conectado ao mongodb");
  } catch (error) {
    console.log(error);
  }
}

run();

module.exports = client;
