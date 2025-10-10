const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://usrTestTarefa:abcd1234@cluster0.c2nn5vt.mongodb.net/";

  const client = new MongoClient(url);

  async function conectarDb() {
    await client.connect();
    return client.db("agenda2"); 
  }
  
  module.exports = conectarDb;