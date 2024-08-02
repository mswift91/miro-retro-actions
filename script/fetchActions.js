const { slack } = require('../config/config');
const { WebClient } = require('@slack/web-api');

const slackClient = new WebClient(slack.token);

async function sendToSlack(message) {
    try {
      console.log('Sending message to Slack channel:', slack.channel);
      await slackClient.chat.postMessage({
        channel: slack.channel,
        text: message,
      });
      console.log('Message sent to Slack');
    } catch (error) {
      console.error('Error sending message to Slack:', error);
    }
  }
  
  module.exports = {
    sendToSlack,
  };
  