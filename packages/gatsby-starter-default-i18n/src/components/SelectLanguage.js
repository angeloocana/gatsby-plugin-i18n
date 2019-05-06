import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { FormattedMessage } from 'react-intl';

const SelectLanguage = (props) => {
  const links = props.langs.map(lang =>
    <Link to={lang.link} key={lang.langKey} style={{
      color: 'white'
    }}>
      <li className="language-selector" selected={lang.selected}>
        {lang.langKey}
      </li>
    </Link>
  );

  return (
    <section style={{float: 'right'}}>
      <ul>
        {links}
      </ul>
    </section>
  );
};

SelectLanguage.propTypes = {
  langs: PropTypes.array
};

export default SelectLanguage;
