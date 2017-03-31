import React from 'react';
import News from './News';

export default {

  path: '/news',

  async action(context) {

    return {
      title: 'News',
      component: <News />,
    };
  },

};
