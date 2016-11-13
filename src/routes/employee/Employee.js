import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import UserDetails from '../../components/User/UserDetails';
import s from './Employee.css';

function Employee({ employee }) {
  return (
    <Layout>
      <div className={s.root}>
        <UserDetails user={employee}/>
      </div>
    </Layout>
  );
}
/*
Employee.propTypes = {
  firstname: PropTypes.string.isRequired,
};*/

export default withStyles(s)(Employee);
