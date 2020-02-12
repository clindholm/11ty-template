module.exports = function (config) {
  config.addPassthroughCopy('./src/images');

  config.addWatchTarget("./src/css/");

  
  return {
    dir: {
      input: "src"
    },
    passthroughFileCopy: true
  };
};