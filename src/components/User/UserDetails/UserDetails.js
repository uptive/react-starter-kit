import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserDetails.css';
import UserPresentation from '../UserPresentation';
import { Button, ButtonGroup, Glyphicon, FormGroup, FormControl, ControlLabel, Collapse, InputGroup } from 'react-bootstrap';


class UserDetails extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  };

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      edit: false,
      user: props.user,
      requiredProperties: ["firstname", "lastname", "birthday", "picture", "email", "developmentGoals", "description"],
    };
  }

  render() {
    var properties = addProperties(this.state.user, this.state.requiredProperties);
    properties = showAllProperties(this.state.user);

    return (
      <div>
        <div className={s.profileHeader}></div>
        <div className={s.profileContainer}>
          <div className={s.profilePresentation}>
            <UserPresentation user={this.state.user}/>
          </div>

          <div className={s.profileSection}>
            <div className={s.editContainer}>
              <div className={s.editButtonContainer}>
                <Button bsSize="xsmall" onClick={ ()=> this.setState({ edit: !this.state.edit })}><Glyphicon glyph="edit" /> Edit</Button>
              </div>
            </div>
            <Collapse in={!this.state.edit}>
              <div>
                <p className={s.description}>
                  {this.state.user.description}
                </p>
                <ButtonGroup>
                  <Button href={this.state.user.developmentGoals}> <Glyphicon glyph="road" /> Development plan</Button>
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
        </div>
      </div>
    );
  }

  save(event){
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open("POST", "https://uptiverse-employee.herokuapp.com/employees/save");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.setRequestHeader("Authorization", "JWT " + this.context.store.getState().runtime.jwtToken);
    xmlhttp.send(JSON.stringify(this.state.user));
    this.setState({ edit: !this.state.edit });
  }

  onChange(event){
    var property = event.target.dataset["property"];
    if(property){
      var modUser = this.state.user;
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