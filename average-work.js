const { time } = require("console");
const Blockchain = require("./blockchain");

const blockchain = new Blockchain();

blockchain.addBlock({ data: "initial" });
// console.log('first block...', blockchain.chain[blockchain.chain.length - 1])

blockchain.addBlock({ data: `block ${1}` });
// console.log('second block...', blockchain.chain[blockchain.chain.length - 1])


let prevTimestamp, nextTimestamp, nextBlock, timeDiff, average;

const times = [];

for (let i = 0; i < 10; i++) {
  prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;
  blockchain.addBlock({ data: `block ${i}` });
  nextBlock = blockchain.chain[blockchain.chain.length - 1];
  nextTimestamp = nextBlock.timestamp;
  timeDiff = nextTimestamp - prevTimestamp;
  times.push(timeDiff);
  average = times.reduce((total, num) => total + num) / times.length;
//   console.log(
//     `time to mine a block ${timeDiff}ms. Difficulty: ${nextBlock.difficulty}. Average time: ${average}`
//   );
}
