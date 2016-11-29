import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ActionMenu.css';

class ActionMenu extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className={s.root}>
        { this.props.children }
      </div>);
  }
}

export default  withStyles(s)(ActionMenu);
