import React, { PropTypes } from 'react';
import Recruits from './Recruits';
import fetch from '../../core/fetch';

export default {

  path: '/recruits',

  async action(context) {
      return {
         title: 'Recruits',
         component: <Recruits/>,
       };
  },
};
