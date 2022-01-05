const Block = require("./block");
const { GENESIS_DATA } = require("./config");

describe("Block", () => {
  const timestamp = Date.now();
  const lastHash = "foo-lastHash";
  const hash = "foo-hash";
  const data = "sagar";
  const block = new Block({
    timestamp: timestamp,
    lastHash: lastHash,
    hash: hash,
    data: data,
  });

  it("has a timestamp, lasthash, hash, data property", () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });

  describe("genesis function", () => {
    const genesisBlock = Block.genesis();
    it("returns a block instance", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });
    it("returns the genesis data", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe("mineBlock()", () => {
    const lastBlock = Block.genesis();
    const data = "mined Data";
    const minedBlock = Block.mineBlock({ lastBlock, data });

    // console.log(minedBlock);

    it("return a Block instance", () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    it("sets the lastHash to be the hash of the lastBlock", () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it("sets the data", () => {
      expect(minedBlock.data).toEqual(data);
    });

    it("seta a timestamp", () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });
  });
});
