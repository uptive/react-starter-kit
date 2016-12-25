import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserEdit.css';
import { Button, ButtonGroup, Glyphicon, FormGroup, FormControl, ControlLabel, Collapse, InputGroup } from 'react-bootstrap';
import { saveEmployee } from '../../../actions/employee';


class UserEdit extends React.Component {
  static propTypes = {
    employee: PropTypes.object,
    isEditing: PropTypes.bool,
    shouldSave: PropTypes.bool,
  };

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isEditing: props.isEditing,
      employee: null,
      requiredProperties: ["firstname", "lastname", "birthday", "picture", "email", "developmentGoals", "description"],
    };
  }

  componentWillReceiveProps(nextProps){
   this.setState({
     employee: nextProps.employee,
     isEditing: nextProps.isEditing,
   });

   if(nextProps.shouldSave){
     this.save();
   }
  }

  render() {
    if(!this.state.employee){ return null; }

    var properties = addProperties(this.state.employee, this.state.requiredProperties);
    properties = showAllProperties(this.state.employee);
    return (
      <div>
        <Collapse in={this.state.isEditing}>
          <div>
            {properties.map((item, index) => (
              <InputGroup key={index}>
                <InputGroup.Addon>{item.property}</InputGroup.Addon>
                <FormControl className={s.link} value={item.value} data-property={item.property} onChange={(e) => this.onChange(e)}/>
              </InputGroup>
            ))}
          </div>
        </Collapse>
      </div>

    );
  }

  save(){
    this.context.store.dispatch(saveEmployee({employee:this.state.employee, token:this.context.store.getState().runtime.jwtToken}));
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

export default withStyles(s)(UserEdit);
