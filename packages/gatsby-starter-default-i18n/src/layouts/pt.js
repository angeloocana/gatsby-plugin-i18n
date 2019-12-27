import React from 'react';
import Layout from './index';

import messages from '../data/messages/pt';
import 'intl/locale-data/jsonp/pt';

export default (props) => (
  <Layout
    {...props}
    i18nMessages={messages}
  />);