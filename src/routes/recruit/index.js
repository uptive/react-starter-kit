import React, { PropTypes } from 'react';
import Recruit from './Recruit';

export default {

  path: '/recruit/:id',

  async action(context) {
      return {
         title: 'Recruit',
         component: <Recruit id={ context.params.id }/>,
       };
  },
};
