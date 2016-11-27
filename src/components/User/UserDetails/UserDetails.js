import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserDetails.css';
import UserPresentation from '../UserPresentation';
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
      edit: false,
      employee: null,
      requiredProperties: ["firstname", "lastname", "birthday", "picture", "email", "developmentGoals", "description"],
    };
  }

  componentWillReceiveProps(nextProps){
   this.setState({employee: nextProps.employee});
  }

  render() {
    if(!this.state.employee){ return null; }

    var properties = addProperties(this.state.employee, this.state.requiredProperties);
    properties = showAllProperties(this.state.employee);
    return (
      <div>
        <div className={s.editContainer}>
          <div className={s.editButtonContainer}>
            <Button bsSize="xsmall" onClick={ ()=> this.setState({ edit: !this.state.edit })}><Glyphicon glyph="edit" /> Edit</Button>
          </div>
        </div>
        <Collapse in={!this.state.edit}>
          <div>
            <p className={s.description}>
              {this.state.employee.description}
            </p>
            <ButtonGroup>
              <Button href={this.state.employee.developmentGoals}> <Glyphicon glyph="road" /> Development plan</Button>
            </ButtonGroup>
          </div>
        </Collapse>
        <Collapse in={this.state.edit}>
          <div>
            {properties.map((item, index) => (
              <InputGroup key={index}>
                <InputGroup.Addon>{item.property}</InputGroup.Addon>
                <FormControl className={s.link} value={item.value} data-property={item.property} onChange={(e) => this.onChange(e)}/>
              </InputGroup>
            ))}
            <div className={s.saveButtonContainer}>
              <Button onClick={ (e) => this.save(e)}><Glyphicon glyph="save"/> Save</Button>
            </div>
          </div>
        </Collapse>
      </div>

    );
  }

  save(event){
    this.context.store.dispatch(saveEmployee({employee:this.state.employee, token:this.context.store.getState().runtime.jwtToken}));
    this.setState({ edit: !this.state.edit });
  }

  onChange(event){
    var property = event.target.dataset["property"];
    if(property){
      var modUser = this.state.employee;
      modUser[property] = event.target.value;
      this.setState({user: modUser});
    }
  }
}


function addProperties(object, properties){
  for (var i = 0;  i < properties.length; i++) {
    addProperty(object, properties[i]);
  }
  return object;
}

function addProperty(object, property){
  if(!object.hasOwnProperty(property)){
    object[property] = "";
  }
  return object;
}

function showAllProperties(object){
  var properties = [];
  for (var property in object) {
    if (object.hasOwnProperty(property) && !property.startsWith("_")) {
      var propertyObj = {
        property: property,
        value: object[property]
      };
      properties.push(propertyObj);
    }
  }
  return properties;
}

export default withStyles(s)(UserDetails);
