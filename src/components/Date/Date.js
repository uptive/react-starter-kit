import React, { PropTypes }  from 'react';

function Date({ children, ...props }) {
  return (<span {...props}>{ formatDate(children) }</span>);
}

function formatDate(unformatted){
  return unformatted.substring(0, 10);
}

export default Date;
