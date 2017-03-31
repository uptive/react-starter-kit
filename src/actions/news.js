import { SET_NEWS, ADD_NEWS, CREATE_NEWS, CANCEL_CREATE_NEWS } from '../constants';
import request from 'superagent';

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
  request
  .get(service.url)
  .set('Authorization', "JWT " + service.token)
  .end(function(err, res){
    var data = JSON.parse(res.text);
    dispatch(setNews(data))
  });
}

export const saveNews = input => dispatch => {
  var service = input.services.news;
  request
  .post(service.url + "/create")
  .send({news:input.news})
  .set('Authorization', "JWT " + service.token)
  .set('Content-Type', "application/json;charset=UTF-8")
  .end(function(err, res){
    var data = JSON.parse(res.text);
    dispatch(getNews(input));
  });
}
