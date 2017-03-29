import { SET_COMMENTS } from '../constants';
import request from 'superagent';

export const setComments = (key, comments) => ({
  type: SET_COMMENTS,
  key,
  comments,
});

export const getComments = input => dispatch => {
  var service = input.services.comments;
  request
  .get(service.url + "/" + input.key)
  .set('Authorization', "JWT " + service.token)
  .end(function(err, res){
    var data = JSON.parse(res.text);
    dispatch(setComments(input.key, data))
  });
};

export const addComment = input => dispatch => {
  var service = input.services.comments;
  request
  .post(service.url + "/" + input.key)
  .send({comment: input.comment})
  .set('Authorization', "JWT " + service.token)
  .set('Content-Type', "application/json;charset=UTF-8")
  .end(function(err, res){
    dispatch(getComments(input));
  });
};
