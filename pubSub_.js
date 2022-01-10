const PubNub = require("pubnub");

const credentials = {
  publishKey: "pub-c-48c87320-0b4f-468e-8724-581a6bdfd307",
  subscribeKey: "sub-c-43ee4176-711b-11ec-bb6e-fa616d2d2ecf",
  secretKey: "sec-c-NzhhNjA3Y2EtMmZhOS00NDcxLWEyZTgtZWQ2MjJlNmY3MWZk",
};

const CHANNELS = {
  TEST: "TEST",
};

class PubSub {
  constructor() {
    this.pubnub = new PubNub(credentials);
    // this.pubnub.subscribe({ channls: [CHANNELS.TEST, CHANNELS.TESTTWO] });
    this.pubnub.subscribe({ channels: [Object.values(CHANNELS)] });
    this.pubnub.addListener(this.listener());
  }

  listener() {
    return {
      message: (messageObject) => {
        const { channel, message } = messageObject;
        console.log(
          `Message recieved. Channel: ${channel}. Message: ${message}`
        );
      },
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}

module.exports = PubSub;
