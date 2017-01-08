import { FIND_RECRUIT, SET_RECRUITS_SEARCH_RESULT, SET_RECRUIT } from '../constants';
import fetch from '../core/fetch';

export const setRecruit = (data) => ({
  type: SET_RECRUIT,
  recruit: data,
});

export const setMatchingReqruits = (result) => ({
  type: SET_RECRUITS_SEARCH_RESULT,
  search_result: result,
});

export const getRecruit = input => dispatch => {
  var service = input.services.recruits;
  const options = {
    "headers":{"Authorization":"JWT " + service.token}
  };
  return fetch(service.url + '/' + input.id, options)
  .then(response => response.json())
  .then(function(json){
    dispatch(setRecruit(json))
  });
}

export const findRecruits = input => dispatch => {
  var service = input.services.recruits;
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        dispatch(setMatchingReqruits(JSON.parse(xmlhttp.response)));
      }
  };

  xmlhttp.open("POST", service.url + "/find");
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xmlhttp.setRequestHeader("Authorization", "JWT " + service.token);
  xmlhttp.send(JSON.stringify({link:input.link}));
}
