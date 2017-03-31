import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';
import { logout } from '../../actions/logout';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class Navigation extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      showMenu: false,
    };
  }
  render() {
    return (
      <div className={cx(s.root, this.props.className)} role="navigation">
        { this.renderIfLoggedin(this.context.store.getState().user) }
      </div>
    );
  }

  renderIfLoggedin(user){
    if(!this.isLoggedIn(user)) return null;
    return (
      <div>
        <span className={cx(s.link, s.highlight)} onClick={(e)=>{ this.toggleMenu(e)}}><FontAwesome name='bars'/></span>
        {this.renderOpenMenu()}
      </div> );
  }

  renderOpenMenu(){
    if(!this.state.showMenu){ return null;}
    return (
      <div className={s.menuContainer}>
        <div className={s.menuContent}>
          <Link className={s.menuBlockLink} to="/news">
            <div className={s.menuBlock}>
              <FontAwesome className={s.menuIcon} name='newspaper-o'/>
              <span className={s.menuText}>News</span>
            </div>
          </Link>

          <Link className={s.menuBlockLink} to="/employees">
            <div className={s.menuBlock}>
              <FontAwesome className={s.menuIcon} name='users'/>
              <span className={s.menuText}>Employees</span>
            </div>
          </Link>

          <Link className={s.menuBlockLink} to="/recruits">
            <div className={s.menuBlock}>
              <FontAwesome className={s.menuIcon} name='user-plus'/>
              <span className={s.menuText}>Recruits</span>
            </div>
          </Link>

          <span className={s.menuBlockLink} onClick={ logout() }>
            <div className={s.menuBlock}>
              <FontAwesome className={s.menuIcon} name='sign-out'/>
              <span className={s.menuText}>Logout</span>
            </div>
          </span>
          </div>
      </div>
    );
  }

  isLoggedIn(user){
    if(user){ return true; }
    return false;
  }

  toggleMenu(){
    this.setState({showMenu: !this.state.showMenu});
  }

}

export default withStyles(s)(Navigation);
