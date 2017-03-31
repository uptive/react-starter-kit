import React, { PropTypes } from 'react';
import Recruits from './Recruits';

export default {

  path: '/recruits',

  async action(context) {
      return {
         title: 'Recruits',
         component: <Recruits/>,
       };
  },
};
