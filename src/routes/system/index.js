import React from 'react';
import System from './../../components/System/System';

export default {

  path: '/system',

  async action(context) {
    return {
      title: 'Uptiverse',
      component: <System loggedInUser={context.store.getState().user}/>,
    };
  },

};
