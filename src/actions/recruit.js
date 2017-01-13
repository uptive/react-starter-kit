import { FIND_RECRUIT, SET_RECRUITS_SEARCH_RESULT, SET_RECRUIT } from '../constants';
import fetch from '../core/fetch';
import request from 'superagent';

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
  request
  .get(service.url + "/" + input.id)
  .set('Authorization', "JWT " + service.token)
  .end(function(err, res){
    var data = JSON.parse(res.text);
    dispatch(setRecruit(data))
  });
}

export const findRecruits = input => dispatch => {
  var service = input.services.recruits;
  request
  .post(service.url + "/find")
  .send({link:input.link})
  .set('Authorization', "JWT " + service.token)
  .set('Content-Type', "application/json;charset=UTF-8")
  .end(function(err, res){
    var data = JSON.parse(res.text);
    dispatch(setMatchingReqruits(data));
  });
}
