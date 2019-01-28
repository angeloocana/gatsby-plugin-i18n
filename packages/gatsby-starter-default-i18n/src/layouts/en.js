import React from 'react';
import Layout from './index';
import { addLocaleData } from 'react-intl';

import messages from '../data/messages/en';
import en from 'react-intl/locale-data/en';
import 'intl/locale-data/jsonp/en';

addLocaleData(en);

export default (props) => (
  <Layout
    {...props}
    i18nMessages={messages}
  />
);