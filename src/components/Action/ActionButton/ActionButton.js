import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ActionButton.css';
import { Glyphicon } from 'react-bootstrap';

class EditButton extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  };

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();

  };

  render() {
    return (
      <div className={s.root} onClick={this.handleClick}>
        <Glyphicon glyph={this.props.icon} className={s.icon} />
      </div>);
  }
}
//<span> {this.props.text}</span>
export default  withStyles(s)(EditButton);
