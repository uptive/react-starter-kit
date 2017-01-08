/* eslint-disable import/prefer-default-export */

import { SET_NEWS, ADD_NEWS, CREATE_NEWS, CANCEL_CREATE_NEWS } from '../constants';
import fetch from '../core/fetch';

export const setNews = (data) => ({
  type: SET_NEWS,
  data: data,
});

export const addNews = (data) => ({
  type: ADD_NEWS,
  news: data,
});

export const createNews = () => ({
  type: CREATE_NEWS,
});

export const cancelCreateNews = () => ({
  type: CANCEL_CREATE_NEWS,
});

export const getNews = input => dispatch => {
  var service = input.services.news;
  const options = {
    "headers":{"Authorization":"JWT " + service.token}
  };
  return fetch(service.url, options)
  .then(response => response.json())
  .then(function(json){
    dispatch(setNews(json))
  });
}

export const saveNews = input => dispatch => {
  var service = input.services.news;
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        dispatch(getNews(input));
      }
  };
  xmlhttp.open("POST", service.url + "/create");
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.setRequestHeader("Authorization", "JWT " + service.token);
  xmlhttp.send(JSON.stringify({news:input.news}));
}
