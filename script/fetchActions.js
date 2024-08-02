const { miro, slack } = require('../config/config');
const { fetchAllItems, findMostRecentActionsBox, getPostItsInBox, stripPTags } = require('/utils/miroApi');
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

async function main() {
  try {
    const items = await fetchAllItems(miro.boardId);
    const foundActionsBox = findMostRecentActionsBox(items);
    if (!foundActionsBox) {
      console.log('No box with "Actions" found.');
      return;
    }
    
    console.log('Most recent actions box:', foundActionsBox);

    const postIts = getPostItsInBox(items, foundActionsBox);
    console.log('Post-its in the "Actions" box:', postIts);

    const actions = postIts.map(item => stripPTags(item.data.content)).join('\n');
    const message = `Most recent actions:\n${actions}`;

    await sendToSlack(message);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
