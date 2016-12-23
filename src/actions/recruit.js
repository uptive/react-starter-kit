/* eslint-disable import/prefer-default-export */

import { FIND_RECRUIT, SET_RECRUITS_SEARCH_RESULT, SET_RECRUIT } from '../constants';
import fetch from '../core/fetch';

const baseUrl = "https://uptiverse-recruit.herokuapp.com";

export const setRecruit = (data) => ({
  type: SET_RECRUIT,
  recruit: data,
});

export const setMatchingReqruits = (result) => ({
  type: SET_RECRUITS_SEARCH_RESULT,
  search_result: result,
});

export const getRecruit = input => dispatch => {
  const options = {
    "headers":{"Authorization":"JWT " + input.token}
  };
  return fetch(baseUrl +'/recruits/' + input.id, options)
  .then(response => response.json())
  .then(function(json){
    dispatch(setRecruit(json))
  });
}

export const findRecruits = input => dispatch => {

  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        dispatch(setMatchingReqruits(JSON.parse(xmlhttp.response)));
      }
  };

  xmlhttp.open("POST", baseUrl+"/recruits/find");
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xmlhttp.setRequestHeader("Authorization", "JWT " + input.token);
  xmlhttp.send(JSON.stringify({link:input.link}));
}
