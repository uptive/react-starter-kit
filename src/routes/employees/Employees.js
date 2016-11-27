import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import s from './Employees.css';
import Link from '../../components/Link';
import EmployeePresentation from '../../components/Employee/EmployeePresentation';

function Employees({ employees }) {
  return (
    <Layout>
      <div className={s.root}>
        <div className={s.listContainer}>
          {employees.map((item, index) => (
            <Link className={s.link} to={formatRoute(item._id)} key={index}>
              <div className={s.listItem}>
                <EmployeePresentation employee={item}/>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

function formatRoute(id){
  return "/employee/" + id;
}

Employees.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  })).isRequired,
};

export default withStyles(s)(Employees);
