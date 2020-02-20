module.exports = function (config) {
  config.addPassthroughCopy('./src/site/images');

  config.addWatchTarget("./src/site/css/");

  config.addFilter('date', require('./src/filters/date'));

  return {
    dir: {
      input: "src/site"
    },
    passthroughFileCopy: true
  };
};