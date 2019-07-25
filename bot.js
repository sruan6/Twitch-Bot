const TwitchJs = require('twitch-js').default;
const {
  TWITCH_TOKEN,
  TWITCH_USERNAME,
  TWITCH_CHANNEL,
} = require('./auth.json');

const token = TWITCH_TOKEN;
const username = TWITCH_USERNAME;

const channel = TWITCH_CHANNEL;

// Instantiate clients.
const { api, chat, chatConstants } = new TwitchJs({ token, username });

// Get featured streams.
api.get('streams/featured').then(response => {
  console.log(response);
  // Do stuff ...
});

// Listen to all events.
const log = msg => {
  console.log(msg);
  if (msg.message === 'Hi') {
    chat.say(channel, 'Hello Friend');
  }
};
chat.on(chatConstants.EVENTS.ALL, log);

// Connect ...
chat.connect().then(() => {
  // ... and then join the channel.
  chat.join(channel);
  chat.say(channel, "I'm connected");
});
