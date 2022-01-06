const cryptoHash = require("./crypto-hash");
const INITIAL_DIFFICULTY = 3;

const timestamp = Date.now();
const lastHash = "____";
const data = [];
const GENESIS_DATA = {
  timestamp: timestamp,
  lastHash: lastHash,
  hash: cryptoHash(timestamp, lastHash, data),
  difficulty: INITIAL_DIFFICULTY,
  nonce:0,
  data: data,
};
module.exports = { GENESIS_DATA };
