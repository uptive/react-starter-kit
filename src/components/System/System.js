import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../Layout';
import s from './System.css';
import { Button } from 'react-bootstrap';

function System({ loggedInUser }) {
  return (
    <Layout>
      <div className={s.container}>
        <h1 className={s.heading}>Is everything up and running?</h1>
      </div>
    </Layout>
  );
}


export default withStyles(s)(System);
