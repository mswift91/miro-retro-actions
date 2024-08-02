const { slack } = require('../config/config');
const { WebClient } = require('@slack/web-api');

const slackClient = new WebClient(slack.token);
