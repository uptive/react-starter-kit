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
  .get(service.url + "comments/" + input.key)
  .set('Authorization', "JWT " + service.token)
  .end(function(err, res){
    var data = JSON.parse(res.text);
    dispatch(setComments(input.key, data))
  });
};
