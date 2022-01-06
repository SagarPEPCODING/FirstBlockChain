const { diff } = require("jest-diff");
const { threadId } = require("worker_threads");
const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

class Block {
  constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis() {
    return new Block(GENESIS_DATA);
  }
  static mineBlock({ lastBlock, data }) {
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    // const timestamp = Date.now();
    const { difficulty } = lastBlock;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));
    {
    }
    return new this({
      timestamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash: hash,
    });
  }
}

// const block1 = new Block({
//   timestamp: Date.now(),
//   lastHash: "lastHash",
//   data: "data",
//   hash: "hash",
// });

// console.log("block1", block1);

module.exports = Block;
