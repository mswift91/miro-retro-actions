function stripPTags(content) {
  return content.replace(/<\/?p>/g, '');
}

module.exports = {
  stripPTags,
};
