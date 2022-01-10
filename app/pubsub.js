// there are two thing :-    Publisher or Subscriber

// If u r publisher then, u gonna send messages on a particular channels...

// If u r subscriber ur job is to subscribe or get the data from the channel...

// Publisher broadcasts the message in the interested networks...

// Subscriber should be listening on the specified channel over the network...

const redis = require("redis");
const CHANNELS = {
  TEST: "TEST",
  BLOCKCHAIN: "BLOCKCHAIN",
};

class PubSub {
  constructor({ blockChain }) {
    this.blockchain = blockChain;
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    // this.subscriber.subscribe(CHANNELS.TEST);
    // this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);
    this.subscribeToChannels();
    this.subscriber.on("message", (channel, message) => {
      this.handleMessage(channel, message);
    });
  }

  handleMessage(channel, message) {
    console.log(`Message received. Channel: ${channel}. Message: ${message}`);
    const parsedMessage = JSON.parse(message);
    // console.log("published this message :- ", parsedMessage);
    if (channel === CHANNELS.BLOCKCHAIN) {
      this.blockchain.replaceChain(parsedMessage);
    }
  }

  publish({ channel, message }) {
    this.subscriber.unsubscribe(channel, () => {
      this.publisher.publish(channel, message, () => {
        this.subscriber.subscribe(channel);
      });
    });
  }

  subscribeToChannels() {
    Object.values(CHANNELS).forEach((channel) => {
      this.subscriber.subscribe(channel);
    });
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }
}

// const testPubSub = new PubSub();
// setTimeout(() => {
//   testPubSub.publisher.publish(CHANNELS.TEST, "sagar");
// }, 1000);
module.exports = PubSub;
