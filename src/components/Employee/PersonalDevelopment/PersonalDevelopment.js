import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PersonalDevelopment.css';
import { Button, ButtonGroup, Glyphicon, FormGroup, FormControl, ControlLabel, Collapse, InputGroup } from 'react-bootstrap';
import { saveEmployee } from '../../../actions/employee';


class PersonalDevelopment extends React.Component {
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
    if(!this.state.employee || !this.state.employee.developmentGoalsLink){ return null; }
    return (
      <div className={s.root}>
        <div>
          <h4 className={s.divider}> Personal development</h4>
          {this.state.employee.developmentGoals}
          <br/>
          <ButtonGroup className={s.button}>
            <Button href={this.state.employee.developmentGoalsLink}> Full development plan <Glyphicon glyph="menu-right" /></Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(PersonalDevelopment);
