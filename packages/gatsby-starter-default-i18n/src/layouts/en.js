import React from 'react';
import Layout from './index';

import messages from '../data/messages/en';
import 'intl/locale-data/jsonp/en';

export default (props) => (
  <Layout
    {...props}
    i18nMessages={messages}
  />
);