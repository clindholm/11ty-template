const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

module.exports = class {
  async data () {
    const fileName = path.basename(__filename, '.11ty.js') + '.css'
    const filePath = path.join(__dirname, fileName);

    return {
      permalink: `css/${fileName}`,
      rawFilepath: filePath,
      rawCss: fs.readFileSync(filePath)
    }
  }

  async render({ rawCss, rawFilepath }) {
    const tailwindConfig = path.join(__dirname, 'tailwind.config.js');

    const glob =
      ['html', 'njk', 'md']
        .map(ext => `./src/**/*.${ext}`)

    const purgecss = require('@fullhuman/postcss-purgecss')({
      content: glob,
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })

    return await postcss([
      require('postcss-import'),
      require('tailwindcss')(tailwindConfig),
      require('autoprefixer'),
      ...process.env.ELEVENTY_ENV === 'prod'
        ? [purgecss, require('cssnano')]
        : []
    ])
    .process(rawCss, { from: rawFilepath })
    .then(result => result.css);
  }

};