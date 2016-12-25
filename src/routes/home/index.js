import React from 'react';
import Home from './Home';

export default {

  path: '/',

  async action(context) {
    return {
      title: 'Uptiverse',
      component: <Home loggedInUser={context.store.getState().user}/>,
    };
  },

};
