import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ContactInfo.css';
import FontAwesome from 'react-fontawesome';

class ContactInfo extends React.Component {
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
    if(!this.state.employee || !this.state.employee.email){ return null; }

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h4 className={s.divider}> Contact information</h4>
          {this.renderEmail()}
          {this.renderPhone()}
          {this.renderGithub()}
          {this.renderDiscord()}
        </div>
      </div>
    );
  }

  renderEmail(){
    if(!this.state.employee || !this.state.employee.email){return null;}
    return (<div className={s.contactInfo}>
      <FontAwesome className={s.connection} name='envelope'/>
      <br/>
      {this.state.employee.email}
    </div>);
  }

  renderPhone(){
    if(!this.state.employee || !this.state.employee.phone){return null;}
    return (<div className={s.contactInfo}>
      <FontAwesome className={s.connection} name='phone'/>
      <br/>
      {this.state.employee.phone}
    </div>);
  }

  renderGithub(){
    if(!this.state.employee || !this.state.employee.github){return null;}
    return (<div className={s.contactInfo}>
      <FontAwesome className={s.connection} name='github'/>
      <br/>
      {this.state.employee.github}
    </div>);
  }

  renderDiscord(){
    if(!this.state.employee || !this.state.employee.discord){return null;}
    return (<div className={s.contactInfo}>
      <FontAwesome className={s.connection} name='bullhorn'/>
      <br/>
      {this.state.employee.phone}
    </div>);
  }
}

export default withStyles(s)(ContactInfo);
