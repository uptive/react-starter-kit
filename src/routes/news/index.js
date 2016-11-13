import React from 'react';
import News from './News';
import fetch from '../../core/fetch';


export default {

  path: '/news',

  async action(context) {
    var data = [];
    const options = {
      "headers":{"Authorization":"JWT " + context.oauthToken}
    };
    await fetch('https://uptiverse-news.herokuapp.com/news', options)
    .then(function(response){
       return response.json();
    })
    .then(function(parsedData) {
      data = parsedData;
      return;
    });

    if (!data) throw new Error('Failed to load the news list.');


    return {
      title: 'News',
      component: <News news ={data}/>,
    };
  },

};
