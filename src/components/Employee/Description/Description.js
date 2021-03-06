import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Description.css';
import { Button, ButtonGroup, Glyphicon, FormGroup, FormControl, ControlLabel, Collapse, InputGroup } from 'react-bootstrap';
import { saveEmployee } from '../../../actions/employee';


class Description extends React.Component {
  static propTypes = {
    employee: PropTypes.object,
  };

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      employee: null,
    };
  }

  componentWillReceiveProps(nextProps){
   this.setState({
     employee: nextProps.employee,
   });
  }

  render() {
    if(!this.state.employee){ return null; }
    return (
      <div className={s.root}>
        <div>
            <p className={s.description}>
              {this.state.employee.description}
            </p>
          </div>
      </div>
    );
  }
}

export default withStyles(s)(Description);
