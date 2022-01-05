const Block = require("./block");
const block = require("./block");
const cryptoHash = require("./crypto-hash");
class blockchain {
  constructor() {
    this.chain = [block.genesis()];
  }
  addBlock({ data }) {
    // console.log(data);
    const lastBlock = this.chain[this.chain.length - 1];
    const objBlock = block.mineBlock({ lastBlock, data });
    this.chain.push(objBlock);
    return objBlock;
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for(let i = 1; i < chain.length; i++) {
        const {timestamp, lastHash, hash, data} = chain[i];
        const actualLastHash = chain[i - 1].hash;
        if(lastHash !== actualLastHash) {
            return false;
        }
        const validatedHash = cryptoHash(timestamp, lastHash, data);
        console.log(`${i}th validated hash`, validatedHash);
        if(hash !== validatedHash) {
            return false;
        }
    }
    return true;
  }
}

module.exports = blockchain;