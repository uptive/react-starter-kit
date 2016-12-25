import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserDetails.css';
import { Button, ButtonGroup, Glyphicon, FormGroup, FormControl, ControlLabel, Collapse, InputGroup } from 'react-bootstrap';
import { saveEmployee } from '../../../actions/employee';


class UserDetails extends React.Component {
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
      <div>
        <div>
            <p className={s.description}>
              {this.state.employee.description}
            </p>

            <ButtonGroup>
              <Button href={this.state.employee.developmentGoals}> <Glyphicon glyph="road" /> Development plan</Button>
            </ButtonGroup>
          </div>
      </div>
    );
  }
}

export default withStyles(s)(UserDetails);
