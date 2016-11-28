import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';
import MenuPresentation from '../User/MenuPresentation';
import { Popover, OverlayTrigger } from 'react-bootstrap';

function Navigation({ className }, context ) {
  return (
    <div className={cx(s.root, className)} role="navigation">
      { getContentBasedOnLoggedInUser(context.store.getState().user) }
    </div>
  );
}

function getContentBasedOnLoggedInUser(user){
  if(!isLoggedIn(user)) return null;
//<MenuPresentation />
  return (
    <div>
      <Link className={s.link} to="/news">News</Link>
      <span className={s.spacer}> | </span>
      <Link className={s.link} to="/employees">Employees</Link>
      <span className={s.spacer}> | </span>
      <Link className={s.link} to="/logout">Logout</Link>
    </div> );
}

function isLoggedIn(user){
  if(user){ return true; }
  return false;
}

Navigation.propTypes = {
  className: PropTypes.string,
};

Navigation.contextTypes = {
    store: React.PropTypes.object
};

export default withStyles(s)(Navigation);
