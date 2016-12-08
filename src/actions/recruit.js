/* eslint-disable import/prefer-default-export */

import { FIND_RECRUIT, SET_RECRUITS_SEARCH_RESULT } from '../constants';
import fetch from '../core/fetch';

export const setMatchingReqruits = (result) => ({
  type: SET_RECRUITS_SEARCH_RESULT,
  search_result: result,
});

export const findRecruits = input => dispatch => {

  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        dispatch(setMatchingReqruits(JSON.parse(xmlhttp.response)));
      }
  };

  xmlhttp.open("POST", "https://uptiverse-recruit.herokuapp.com/recruits/find");
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xmlhttp.setRequestHeader("Authorization", "JWT " + input.token);
  xmlhttp.send(JSON.stringify({link:input.link}));
}
