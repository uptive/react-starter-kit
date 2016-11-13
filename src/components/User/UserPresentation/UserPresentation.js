import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserPresentation.css';

function UserPresentation({ user }) {
  return (
    <div className={s.pictureContainer}>
      <div className={s.picture}>
        <img src={user.picture} />
      </div>
      <p className={s.userName}>
        {user.firstname} {user.lastname}
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
