const cron = require('node-cron');
const app = require('../server/index.js');
const { genProfile } = require('../database/dummyData/movieData.js');

const genQuery = () => {
  const movieHistory = {};
  const moviesWatched = Math.random() * 5000;
  while (Object.keys(movieHistory).length < moviesWatched) {
    movieHistory[Math.floor(Math.random() * 300000)] = 1;
  }
  return {
    userId: Math.floor(Math.random() * 1000000),
    profile: genProfile(),
    movieHistory,
  };
};

const genOptions = () => ({
  MessageBody: JSON.stringify(genQuery()),
  QueueUrl: app.queues.user,
  MessageGroupId: 'user',
});

const sendMsg = (options) => {
  app.sendMessages(options)
    .then(() => app.log({ action: 'request userdata' }))
    .catch(() => app.log({ action: 'request userdata', error: true }));
};

cron.schedule('*/3 * * * * *', () => (sendMsg(genOptions())));
