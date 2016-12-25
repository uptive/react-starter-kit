import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ContactInfo.css';

class ContactInfo extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          CONTACT
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ContactInfo);
