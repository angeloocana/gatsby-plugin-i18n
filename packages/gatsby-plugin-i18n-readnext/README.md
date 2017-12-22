# gatsby-plugin-i18n-readnext

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0b3a917c0cb9433cb12eec33b989c723)](https://www.codacy.com/app/angeloocana/gatsby-plugin-i18n-readnext?utm_source=github.com&utm_medium=referral&utm_content=angeloocana/gatsby-plugin-i18n-readnext&utm_campaign=badger)
[![Build Status](https://travis-ci.org/angeloocana/gatsby-plugin-i18n-readnext.svg)](https://travis-ci.org/angeloocana/gatsby-plugin-i18n-readnext)
[![NPM](https://img.shields.io/npm/v/gatsby-plugin-i18n-readnext.svg)](https://www.npmjs.com/package/gatsby-plugin-i18n-readnext)
[![codecov.io](http://codecov.io/github/angeloocana/gatsby-plugin-i18n-readnext/coverage.svg)](http://codecov.io/github/angeloocana/gatsby-plugin-i18n-readnext)
[![Dependency Status](https://gemnasium.com/angeloocana/gatsby-plugin-i18n-readnext.svg)](https://gemnasium.com/angeloocana/gatsby-plugin-i18n-readnext)
[![bitHound Score](https://www.bithound.io/github/gotwarlost/istanbul/badges/score.svg)](https://www.bithound.io/github/angeloocana/gatsby-plugin-i18n-readnext)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Read Next feature for multi language gatsby projects.

## Examples

https://angeloocana.com (source)https://github.com/angeloocana/angeloocana


## Install
```bash
    npm install gatsby-plugin-i18n-readnext --save
```


## How to use
1. Include the plugin in your `gatsby-config.js` file after **gatsby-plugin-i18n**.

```javascript
// in gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-plugin-i18n-readnext',
    options: { // Default options
      nPosts: 3
    }
  }
]
```

2. (Optional) Add **readNext** prop to your .md files containing the slugs

> Pages without **readNext** prop will receive random data.

```markdown
    ---
    title: Your awesome title
    readNext:
      - /en/blog/js/spred-operator/
      - /en/blog/vim/vim-help-commands/
      - /en/blog/terminal/install-zsh/
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
            readNextPosts{
              excerpt,
              frontmatter{
                date
                title
              }
              fields{
                langKey
                slug
              }
            }
          }
        }
      }
    }
  }
```

## TO DO (HELP US!)

### 1) Add real graphql link to nodes

I tried to link the whole node to the readNextPosts list,
but I got an memory error.

So I'm selecting only these fields:

```graphql
  {
    excerpt,
    frontmatter{
      date
      title
    }
    fields{
      langKey
      slug
    }
  }
```

### 2) Use only one gatsby API method

I tried to use only **createPages** but an error happens in the build process when validating the graphql query for the pages.
The project builds and graphIql works fine.

Using **setFieldsOnGraphQLNodeType** I can't access the excerpt and date fields.



PRs are WELCOME!
