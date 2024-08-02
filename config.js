require('dotenv').config();

module.exports = {
  miro: {
    token: process.env.MIRO_API_TOKEN,
    boardId: process.env.MIRO_BOARD_ID,
  },
  slack: {
    token: process.env.SLACK_TOKEN,
    channel: process.env.SLACK_CHANNEL,
  },
};
