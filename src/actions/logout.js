import request from 'superagent';
export const logout = input => dispatch => {
  request
  .get("/logout")
  .end(function(err, res){
    window.location = "/";
  });
};
