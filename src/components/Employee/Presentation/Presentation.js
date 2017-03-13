import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Presentation.css';

function Presentation({ employee }) {
  return (
    <div className={s.pictureContainer}>
      { renderImage(employee) }
      { renderName(employee) }
    </div>
  );
}

function renderImage(employee){
  var image = "";
  if(employee){ image = (<img src={employee.picture} />); }

  return (
    <div className={s.picture}>
      { image }
    </div>
  );
}

function renderName(employee){
  var name = "";
  if(employee){ name = employee.firstname + " " + employee.lastname; }

  return (
    <p className={s.userName}>
      { name }
    </p>
  );
}

export default withStyles(s)(Presentation);
