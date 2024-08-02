const { miro } = require('../config/config');
const { fetchAllItems, findMostRecentActionsBox, getPostItsInBox, stripPTags } = require('./miroApi');
const { sendToSlack } = require('./slackApi');

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
