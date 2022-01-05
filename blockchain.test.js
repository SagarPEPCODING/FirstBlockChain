const blockChain = require("./blockchain");
const block = require("./block");
const { GENESIS_DATA } = require("./config");

describe("blockchain", () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new blockChain();
  });

  it("contains a chain array instance", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it("starts with a genesis block", () => {
    expect(blockchain.chain[0]).toEqual(GENESIS_DATA);
  });

  it("add new block to the chain", () => {
    const newData = "foo bar";
    blockchain.addBlock({ data: newData });
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });

    describe("is valid chain", () => {
      describe("when the chain does not start with the genesis block", () => {
        it("return false", () => {
          blockchain.chain[0] = { data: "fake-genesis" };
          expect(blockChain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
      describe("when the chain starts with the genesis block has multiple blocks", () => {
        beforeEach(() => {
          blockchain.addBlock({ data: "bears" });
          blockchain.addBlock({ data: "beats" });
          blockchain.addBlock({ data: "battler" });
        });
        describe("and the lastHash reference has changed", () => {
          it("return false", () => {
            blockchain.chain[2].lastHash = "broken-lastHash";
            expect(blockChain.isValidChain(blockchain.chain)).toBe(false);
          });
        });

        describe("and the chain contains block with an invalid field", () => {
          it("return false", () => {
            blockchain.chain[2].data = "some bad and evil data";
            expect(blockChain.isValidChain(blockchain.chain)).toBe(false);
          });
        });

        describe("and the chain does not contain any invalid blocks", () => {
          it("return true", () => {
            console.log('this is my chain...', blockchain.chain);
            expect(blockChain.isValidChain(blockchain.chain)).toBe(true);
          });
        });
      });
    });
});
