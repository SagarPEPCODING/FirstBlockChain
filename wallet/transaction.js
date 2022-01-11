const { send } = require("express/lib/response");
const { v4: uuidv4 } = require("uuid");
const { verifySignature } = require("../util/index");

class Transaction {
  constructor({ senderWallet, recipient, amount }) {
    this.id = uuidv4();
    this.outputMap = this.createOutputMap({ senderWallet, recipient, amount });
    this.input = this.createInput({ senderWallet, outputMap: this.outputMap });
  }

  createInput({ senderWallet, outputMap }) {
    return {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(outputMap),
    };
  }

  createOutputMap({ senderWallet, recipient, amount }) {
    const outputMap = {};
    outputMap[recipient] = amount;
    outputMap[senderWallet.publicKey] = senderWallet.balance - amount;
    // console.log("this is outputmap ", outputMap);
    return outputMap;
  }

  static validTransaction(transaction) {
    const {
      input: { address, amount, signature },
      outputMap,
    } = transaction;
    const outputTotal = Object.values(outputMap).reduce(
      (total, outputAmount) => total + outputAmount
    );
    if (amount !== outputTotal) {
      console.error(`Invalid Transaction from ${address}`);
      return false;
    }
    if (!verifySignature({ publicKey: address, data: outputMap, signature })) {
      console.error(`Invalid Signature from ${address}`);
      return false;
    }
    return true;
  }
}

module.exports = Transaction;
