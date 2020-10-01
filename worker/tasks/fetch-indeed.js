var fetch = require('node-fetch');
var redis = require("redis"),
    client = redis.createClient();

const { promisify } = require("util");
// const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

