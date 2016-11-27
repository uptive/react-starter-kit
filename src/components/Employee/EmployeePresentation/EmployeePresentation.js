import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EmployeePresentation.css';

function UserPresentation({ employee }) {
  if(!employee){ return (<div></div>); }

  return (
    <div className={s.pictureContainer}>
      <div className={s.picture}>
        <img src={employee.picture} />
      </div>
      <p className={s.userName}>
        {employee.firstname} {employee.lastname}
      </p>
    </div>
  );
}

/*
Layout.propTypes = {
  user: PropTypes.object.isRequired,
};
*/
export default withStyles(s)(UserPresentation);
