const express = require("express");
const Blockchain = require("./blockchain/blockchain");
const app = express();
const bodyParser = require("body-parser");
const PubSub = require("./app/pubsub");
const request = require("request");
const blockchain = require("./blockchain/blockchain");

const blockChain = new Blockchain();
const pubsub = new PubSub({ blockChain });
const DEFAULT_PORT = 3000;

const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

// setTimeout(() => {
//   // console.log(blockChain);
//   pubsub.broadcastChain();
// }, 1000);

app.use(bodyParser.json());

app.get("/api/blocks", (req, res) => {
  return res.json(blockChain.chain);
});

app.post("/api/mine", (req, res) => {
  const { data } = req.body;
  blockChain.addBlock({ data });
  pubsub.broadcastChain();
  res.redirect("/api/blocks");
});

const syncChains = () => {
  request(
    { url: `${ROOT_NODE_ADDRESS}/api/blocks` },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const rootChain = JSON.parse(body);
        console.log("replace chain on a sync with", rootChain);
        blockChain.replaceChain(rootChain);
      }
    }
  );
};

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
  console.log(`application has started listening on the localhost:${PORT}`);
  if (PORT !== DEFAULT_PORT) {
    syncChains();
  }
});
