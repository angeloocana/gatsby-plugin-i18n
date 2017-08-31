# gatsby-plugin-i18ns
Add different languages (i18n) for Gatsby.


## Examples

https://angeloocana.com (source)https://github.com/angeloocana/angeloocana

file | url
-- | --
src/pages/about.en.js | /en/about
src/pages/about/index.en.js | /en/about
src/pages/blog/gatsby-i18n.pt.md | /pt/gatsby-i18n


## Install
```bash
  npm install gatsby-plugin-i18n --save
```


## How to use
1. Include the plugin in your `gatsby-config.js` file.

```javascript
// in gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-plugin-i18n',
    options: { // Default options
      postPage: 'src/templates/blog-post.js',
      tagPage: 'src/templates/tag-page.js',
      tagsUrl: '/tags/',
      langKeyForNull: 'any',
      langKeyDefault: 'en'
    }
  }
]
```
