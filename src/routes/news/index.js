import React from 'react';
import News from './News';
import fetch from '../../core/fetch';

export default {

  path: '/news',

  async action(context) {

    return {
      title: 'News',
      component: <News />,
    };
  },

};
