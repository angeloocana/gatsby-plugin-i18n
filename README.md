# gatsby-plugin-i18n

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0b3a917c0cb9433cb12eec33b989c723)](https://www.codacy.com/app/angeloocana/gatsby-plugin-i18n?utm_source=github.com&utm_medium=referral&utm_content=angeloocana/gatsby-plugin-i18n&utm_campaign=badger)
[![Build Status](https://travis-ci.org/angeloocana/gatsby-plugin-i18n.svg?branch=master)](https://travis-ci.org/angeloocana/gatsby-plugin-i18n)
[![NPM](https://img.shields.io/npm/v/gatsby-plugin-i18n.svg)](https://www.npmjs.com/package/gatsby-plugin-i18n)
[![codecov.io](http://codecov.io/github/angeloocana/gatsby-plugin-i18n/coverage.svg)](http://codecov.io/github/angeloocana/gatsby-plugin-i18n)
[![Dependency Status](https://gemnasium.com/angeloocana/gatsby-plugin-i18n.svg)](https://gemnasium.com/angeloocana/gatsby-plugin-i18n)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Hi Folks!

Are you trying to build a multi-language [Gatsby](https://gatsby.com) website? **We want to help you!**

If you need additional help, feel free to open an issue, make a suggestion, or report a bug. Better yet, we would LOVE for you to [contribute](https://www.dataschool.io/how-to-contribute-on-github/) to this project and help us to help others.

*Please note:*

> Gatsby-Plugin-i18n can be safely used with **react-intl**, **i18next**, or any other i18n library.

## Why use our plugin?

Google! It's all about url routes. Google needs different URLs to crawl and render your pages for each language.

> This plugin does not translate messages. Instead, it creates routes for each language. You can even use different layouts for each language if you would like.

## Install
```bash
  yarn add gatsby-plugin-i18n
```

## How to use this plugin

Include the plugin in your `gatsby-config.js` file.

For each language you wish to include in your project:

1. Create a root directory in your /src directory named after its related ```langKey``` E.g. ```/src/en/``` or ```/src/pt/```.
2. Create a copy of your original ```/src``` contents and place them under the new ```/src/[langKey]/``` directory.
3. For each file you wish to translate, rename the copied files, adding the ending, ```.**langKey**.js```.

Examples:

file | url
-- | --
src/en/pages/about.**en**.js | /**en**/about
src/en/pages/about/index.**en**.js | /**en**/about
src/pt/pages/blog/gatsby-i18n.**pt**.md | /**pt**/blog/gatsby-i18n

### Simple configuration example:
```javascript
// Add to gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-plugin-i18n',
    options: {        
      langKeyDefault: 'en',
      useLangKeyLayout: false
    }
  }
]
```

### Blog using **markdownRemark** configuration example:
```javascript
// Add to gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-plugin-i18n',
    options: {        
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

## Showcase

Websites built with Gatsby i18n:

* [hugomagalhaes.com](https://www.hugomagalhaes.com) [(source)](https://github.com/hugomn/hugomagalhaes.com) *Gatsby v2*
* [angeloocana.com](https://angeloocana.com) [(source)](https://github.com/angeloocana/angeloocana)
* [tic-tac-toe-ai.surge.sh](https://tic-tac-toe-ai.surge.sh) [(source)](https://github.com/angeloocana/tic-tac-toe-ai)
* [Imagine Clarity](https://imagineclarity.com)
* [Peintagone](https://www.peintagone.be)

Feel free to add your project to the list, we would love to see what you are building!

## Starters

[Click here for several i18n Gatsby "starter" sites.](https://www.gatsbyjs.com/starters/?c=i18n)

  * With our plugin: [gatsby-starter-default-i18n](https://github.com/angeloocana/gatsby-plugin-i18n/tree/master/packages/gatsby-starter-default-i18n) [DEMO](https://gatsby-starter-default-i18n.netlify.com), features:
    - automatic browser-language detection and redirection
    - integration with react-intl `FormattedMessage` with translation keys
    - custom layout and pages per language
    - language switcher component
    - dev mode with HMR
    - build deployed to Netlify


## Packages

  * [gatsby-plugin-i18n](https://github.com/angeloocana/gatsby-plugin-i18n/tree/master/packages/gatsby-plugin-i18n)
  * [gatsby-plugin-i18n-readnext](https://github.com/angeloocana/gatsby-plugin-i18n/tree/master/packages/gatsby-plugin-i18n-readnext)
  * [gatsby-plugin-i18n-tags](https://github.com/angeloocana/gatsby-plugin-i18n/tree/master/packages/gatsby-plugin-i18n-tags)
  * [ptz-i18n](https://github.com/angeloocana/gatsby-plugin-i18n/tree/master/packages/ptz-i18n)

### All Options

* **langKeyDefault:**
langKey to use when no langKey specified.

* **useLangKeyLayout:**

  **true**: use a different layout for each langKey (src/layouts/**en**.js, src/layouts/**pt**.js, ...)

  **false**: use default layout (src/layouts/index.js)

* **markdownRemark:**

  Add markdownRemark if you are using **gatsby-transformer-remark**.

  You can set a **postPage** component and a **query** to get the pages.

* **langKeyForNull:**
  langKey added to page context and graphql when no langKey specified. Default: **any**.

* **pagesPaths:**
   If you are not using just `/src/pages/` folder, you can add an array with the folders your are using:
   ```
    plugins: [
      //... other plugins
      {
        resolve: 'gatsby-plugin-i18n',
        options: {        
          //.. other options
          pagesPaths: [ '/my/custom/pages/folder1', /my/custom/pages/folder2/ ]
        }
      }
    ]
   ```

* **prefixDefault:**

  **true**: add langKey on all pages, including default

  **false**: omit langKey in url when page lang is the default.
    Ex: when `langKeyDefault` is `en`, `blog/first-post.en.md` and `blog/first-post.pt.md` will have the following urls:
    - `/blog/first-post`
    - `/pt/blog/first-post`

  Default: **true**


## Finally

Go Gatsby!

Go Open-source!

Good luck folks! Open an issue if you need help.
