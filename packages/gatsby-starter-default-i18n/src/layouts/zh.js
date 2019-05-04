import React from 'react';
import Layout from './index';
import { addLocaleData } from 'react-intl';

import messages from '../data/messages/zh';
import zh from 'react-intl/locale-data/zh';
import 'intl/locale-data/jsonp/zh';

addLocaleData(zh);

export default (props) => (
  <Layout
    {...props}
    i18nMessages={messages}
  />);
