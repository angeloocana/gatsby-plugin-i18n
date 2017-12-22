# gatsby-plugin-i18n-tags

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0b3a917c0cb9433cb12eec33b989c723)](https://www.codacy.com/app/angeloocana/gatsby-plugin-i18n-tags?utm_source=github.com&utm_medium=referral&utm_content=angeloocana/gatsby-plugin-i18n-tags&utm_campaign=badger)
[![Build Status](https://travis-ci.org/angeloocana/gatsby-plugin-i18n-tags.svg)](https://travis-ci.org/angeloocana/gatsby-plugin-i18n-tags)
[![NPM](https://img.shields.io/npm/v/gatsby-plugin-i18n-tags.svg)](https://www.npmjs.com/package/gatsby-plugin-i18n-tags)
[![codecov.io](http://codecov.io/github/angeloocana/gatsby-plugin-i18n-tags/coverage.svg)](http://codecov.io/github/angeloocana/gatsby-plugin-i18n-tags)
[![Dependency Status](https://gemnasium.com/angeloocana/gatsby-plugin-i18n-tags.svg)](https://gemnasium.com/angeloocana/gatsby-plugin-i18n-tags)
[![bitHound Score](https://www.bithound.io/github/gotwarlost/istanbul/badges/score.svg)](https://www.bithound.io/github/angeloocana/gatsby-plugin-i18n-tags)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Add tags for different languages (i18n) for Gatsby.


## Examples

* [angeloocana.com](https://angeloocana.com/en/tags) [(source)](https://github.com/angeloocana/angeloocana)


## Install
```bash
    npm install gatsby-plugin-i18n-tags --save
```


## How to use
1. Include the plugin in your `gatsby-config.js` file after **gatsby-plugin-i18n**.

```javascript
// in gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-plugin-i18n-tags',
    options: { // Default options
      tagPage: 'src/templates/tag-page.js',
      tagsUrl: '/tags/',
      langKeyForNull: 'any'
    }
  }
]
```


2. Add **tags** prop to your .md files
```markdown
    ---
    title: Your awesome title
    tags:
      - Linux
      - Arch
    ---
```


3. Query!

```graphql
  {
    allMarkdownRemark{
      edges{
        node{
          frontmatter{
            title
          }
          fields{
            tagSlugs {
              tag
              link
            }
          }
        }
      }
    }
  }
```
