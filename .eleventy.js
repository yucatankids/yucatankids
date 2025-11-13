// importing a library to allow for easier date conversions (see line 14)
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const { DateTime } = require('luxon');

module.exports = async function (eleventyConfig) {
  const { I18nPlugin } = await import("@11ty/eleventy");

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(I18nPlugin, {
    defaultLanguage: "en",
		// Rename the default universal filter names
		filters: {
			// transform a URL with the current page’s locale code
			url: "locale_url",
			// find the other localized content for a specific input file
			links: "locale_links",
		},
    // When to throw errors for missing localized content files
		errorMode: "allow-fallback", // throw an error if content is missing at /en/slug
		// errorMode: "allow-fallback", // only throw an error when the content is missing at both /en/slug and /slug
		// errorMode: "never", // don’t throw errors for missing content
  });
  

  // allows css, assets, and CMS config files to be passed into /public
  eleventyConfig.addPassthroughCopy('./src/css/**/*.css');
  eleventyConfig.addPassthroughCopy('./src/assets');
  eleventyConfig.addPassthroughCopy('./src/admin');
  eleventyConfig.addPassthroughCopy('.src/_redirects');
  // Put robots.txt in root
  eleventyConfig.addPassthroughCopy({ 'src/robots.txt': '/robots.txt' });

  // watch CSS files for changes - doesn't trigger 11ty rebuild
  eleventyConfig.setBrowserSyncConfig({
    files: './public/css/**/*.css',
  });

  // normally, 11ty will render dates on blog posts in full JSDate format (Fri Dec 02 18:00:00 GMT-0600). That's ugly
  // this filter allows dates to be converted into a normal, locale format. view the docs to learn more (https://moment.github.io/luxon/api-docs/index.html#datetime)
  eleventyConfig.addFilter('postDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("pageLang", function(value) {
    return value.filter(item => item.page.lang === this.page.lang)
  });

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      output: 'public',
    },
    // allows .html files to contain nunjucks templating language
    htmlTemplateEngine: 'njk',
  };
};
