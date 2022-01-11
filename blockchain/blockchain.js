const Block = require("./block");
const block = require("./block");
const cryptoHash = require("../util/crypto-hash");
class blockchain {
  constructor() {
    this.chain = [block.genesis()];
  }
  addBlock({ data }) {
    const lastBlock = this.chain[this.chain.length - 1];
    const objBlock = block.mineBlock({ lastBlock, data });
    this.chain.push(objBlock);
    return objBlock;
  }

  replaceChain(chain) {
    console.log(chain.length, this.chain.length);
    if (chain.length <= this.chain.length) {
      console.error("this incoming chain must be longer");
      return;
    }
    if (!blockchain.isValidChain(chain)) {
      console.error("this incoming chain must be valid");
      return;
    }
    console.log("replaced chain with", chain);
    this.chain = chain;
    console.log(chain.length, this.chain.length);
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      console.log('checking genesis'); 
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, lastHash, hash, nonce, difficulty, data } = chain[i];
      const actualLastHash = chain[i - 1].hash;
      const lastDifficulty = chain[i - 1].difficulty;

      if (lastHash !== actualLastHash) {
        // console.log('checking lastHash', lastHash, actualLastHash);
        return false;
      }
      const validatedHash = cryptoHash(
        timestamp,
        lastHash,
        data,
        nonce,
        difficulty
      );

      if (Math.abs(lastDifficulty - difficulty) > 1) { 
        // console.log('checking difficulty', Math.abs(lastDifficulty - difficulty));
        return false;
      }
      if (hash !== validatedHash) {
        // console.log('checking valid hash');
        return false;
      }
    }
    return true;
  }
}

module.exports = blockchain;
