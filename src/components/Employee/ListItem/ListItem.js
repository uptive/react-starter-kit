import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListItem.css';

function ListItem({ employee }) {
  if(!employee){ return (<div></div>); }

  return (
    <div className={s.container}>
      <div className={s.picture}>
        <img src={employee.picture} />
      </div>
      <div className={s.userName}>
        {employee.firstname} {employee.lastname}
      </div>
    </div>
  );
}

/*
<div className={s.pictureContainer}>
  <div className={s.picture}>
    <img src={employee.picture} />
  </div>
  <p className={s.userName}>
    {employee.firstname} {employee.lastname}
  </p>
</div>
*/

export default withStyles(s)(ListItem);
