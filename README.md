# gatsby-plugin-i18n

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0b3a917c0cb9433cb12eec33b989c723)](https://www.codacy.com/app/angeloocana/gatsby-plugin-i18n?utm_source=github.com&utm_medium=referral&utm_content=angeloocana/gatsby-plugin-i18n&utm_campaign=badger)
[![Build Status](https://travis-ci.org/angeloocana/gatsby-plugin-i18n.svg)](https://travis-ci.org/angeloocana/gatsby-plugin-i18n)
[![NPM](https://img.shields.io/npm/v/gatsby-plugin-i18n.svg)](https://www.npmjs.com/package/gatsby-plugin-i18n)
[![codecov.io](http://codecov.io/github/angeloocana/gatsby-plugin-i18n/coverage.svg)](http://codecov.io/github/angeloocana/gatsby-plugin-i18n)
[![Dependency Status](https://gemnasium.com/angeloocana/gatsby-plugin-i18n.svg)](https://gemnasium.com/angeloocana/gatsby-plugin-i18n)
[![bitHound Score](https://www.bithound.io/github/gotwarlost/istanbul/badges/score.svg)](https://www.bithound.io/github/angeloocana/gatsby-plugin-i18n)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Add different languages (i18n) for Gatsby.


## Showcase

Websites built with Gatsby i18n:
* [angeloocana.com](https://angeloocana.com) [(source)](https://github.com/angeloocana/angeloocana)
* [tic-tac-toe-ai.surge.sh](https://tic-tac-toe-ai.surge.sh) [(source)](https://github.com/angeloocana/tic-tac-toe-ai)

## How it works

Name your files with .**langKey**.js and the url will be /**langKey**/path/fileName

Examples:

file | url
-- | --
src/pages/about.**en**.js | /**en**/about
src/pages/about/index.**en**.js | /**en**/about
src/pages/blog/gatsby-i18n.**pt**.md | /**pt**/blog/gatsby-i18n


## Install
```bash
  npm install gatsby-plugin-i18n --save
```


## How to use
1. Include the plugin in your `gatsby-config.js` file.

if you are NOT using **markdownRemark** you can remove the prop.

```javascript
// in gatsby-config.js
plugins: [
  {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyForNull: 'any',
        langKeyDefault: 'en',
        useLangKeyLayout: false,
        markdownRemark: {
          postPage: 'src/templates/blog-post.js',
          query: `
          {
              allMarkdownRemark {
                  edges {
                  node {
                      fields {
                      slug,
                      langKey
                      }
                  }
                  }
              }
          }
          `
        }
      }
    }
]
```

### Options

#### langKeyForNull
lanKey to be added to context, in other to know that is not the default langKey.

#### langKeyDefault
lanKey to use when no lanKey specified.

#### useLangKeyLayout
**true**: create one layout for each langKey (src/layouts/en.js, src/layouts/pt.js, ...)

**false**: use default layout (src/layouts/index.js)

#### markdownRemark

Add markdownRemark if you are using **gatsby-transformer-remark**.

You can set a **postPage** component and a **query** to get the pages.
