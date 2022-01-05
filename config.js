const cryptoHash = require("./crypto-hash");

const timestamp = Date.now();
const lastHash = "____";
const data = [];
const GENESIS_DATA = {
  timestamp: timestamp,
  lastHash: lastHash,
  hash: cryptoHash(timestamp, lastHash, data),
  data: data,
};
module.exports = { GENESIS_DATA };
