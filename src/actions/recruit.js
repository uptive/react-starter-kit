import { FIND_RECRUIT, SET_RECRUITS_SEARCH_RESULT, SET_RECRUIT, CREATE_RECRUIT, CREATE_RECRUIT_CANCEL, CREATE_RECRUIT_DONE } from '../constants';
import fetch from '../core/fetch';
import request from 'superagent';

export const setRecruit = (data) => ({
  type: SET_RECRUIT,
  recruit: data,
});

export const createRecruit = () => ({
  type: CREATE_RECRUIT,
});

export const createRecruitCancel = () => ({
  type: CREATE_RECRUIT_CANCEL,
});

export const createRecruitDone = () => ({
  type: CREATE_RECRUIT_DONE,
});

export const setMatchingRecruits = (result) => ({
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
    dispatch(setMatchingRecruits(data));
  });
}

export const saveRecruit = input => dispatch => {
  var service = input.services.recruits;

  request
  .post(service.url + "/create")
  .send({recruit:input.recruit})
  .set('Authorization', "JWT " + service.token)
  .set('Content-Type', "application/json;charset=UTF-8")
  .end(function(err, res){
    var data = JSON.parse(res.text);
    dispatch(createRecruitDone());
    dispatch(setMatchingRecruits({recruits:[data]}));
  });
}
