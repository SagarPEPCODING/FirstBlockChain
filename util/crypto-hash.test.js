const cryptoHash = require("./crypto-hash");

describe("cryptoHash Function", () => {
  it("generates a sha-256 hased output", () => {
    expect(cryptoHash("sagar")).toEqual('d51ae77904d69eb36a3a1c774def03c1a79c1dbc489641597120308fe9fb25e9')
  });

  it("produces the same hash with the more then one inputs in any order for hash...", () => {
      expect(cryptoHash('one', 'two', 'three')).toEqual(cryptoHash('three', 'two', 'one'))
  })
});
