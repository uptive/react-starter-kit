/* eslint-disable import/prefer-default-export */

import { SET_NEWS } from '../constants';
import fetch from '../core/fetch';

export const setNews = (data) => ({
  type: SET_NEWS,
  data: data,
})

export const getNews = input => dispatch => {
  const options = {
    "headers":{"Authorization":"JWT " + input.token}
  };
  return fetch('https://uptiverse-news.herokuapp.com/news', options)
  .then(response => response.json())
  .then(function(json){
    dispatch(setNews(json))
  });
}
