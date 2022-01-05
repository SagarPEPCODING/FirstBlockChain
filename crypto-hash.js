const crypto = require("crypto");

// const cryptoHash = (...inputs) => {
//   // console.log(inputs);
//   const hash = crypto.createHash("sha256");
//   hash.update(inputs.sort().join(" "));
//   console.log(inputs, " ", hash.digest("hex"));
//   return hash.digest("hex");
// };

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash("sha256");
  const input = inputs.sort().join(" ");
//   console.log(input + "ss");
  hash.update(input);
  const digestedHash = hash.digest("hex");
//   console.log(digestedHash);
  return digestedHash;
};
module.exports = cryptoHash;