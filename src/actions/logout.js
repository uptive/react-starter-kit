export const logout = input => dispatch => {


  var xmlhttp = new XMLHttpRequest();
console.log("dsadsa");
  xmlhttp.onreadystatechange = function() {
    console.log("aaaaa");
  };
  xmlhttp.open("GET", "/logout");
  xmlhttp.send();
};
