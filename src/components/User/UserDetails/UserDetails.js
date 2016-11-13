import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserDetails.css';
import UserPresentation from '../UserPresentation';
import { Button, ButtonGroup, Glyphicon, FormGroup, FormControl } from 'react-bootstrap';

function UserDetails({ user, onChange }) {
  var properties = showAllProperties(user);

  return (
    <div>
      <div className={s.profileHeader}></div>
      <div className={s.profileContainer}>
        <div className={s.profilePresentation}>
          <UserPresentation user={user}/>
        </div>
        <div className={s.profileSection}>
          <p className={s.description}>
            {user.description}
          </p>
          <ButtonGroup>
            <Button href={user.developmentGoals}> <Glyphicon glyph="road" /> Development plan</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
/*


<br/>
<br/>
<br/>
<br/>
------ all properties listed, dev purpouse -------
<br/>
      {properties.map((item, index) => (
          <div key={index} className={s.link}>{item.property}: {item.value}</div>
      ))}

*/
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

function onChange(event){
  console.log("HEJ" + event);
}


UserDetails.propTypes = {
  onChange: PropTypes.func,
};

export default withStyles(s)(UserDetails);
