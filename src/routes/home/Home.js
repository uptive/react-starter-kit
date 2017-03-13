import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import s from './Home.css';
import { Button } from 'react-bootstrap';

/**/
class Home extends Component {

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state =  {
      loggedInUser: this.context.store.getState().user
    };
    this.changeHandler = this.context.store.subscribe(() => this.handleChange(this));
  }

  componentWillUnmount(){
    if(this.changeHandler){
      this.changeHandler();
    }
  }

  handleChange(){
    this.setState({
      loggedInUser: this.context.store.getState().user
    });
  }

  render() {
    var content = this.renderContent(this.state.loggedInUser);
    return (
      <Layout>
        <div className={s.container}>
          <h1 className={s.heading}>Welcome to Uptiverse</h1>
          { content }
        </div>
      </Layout>
    );
  }

  renderContent(loggedInUser){
    if(loggedInUser){ return this.renderPrivateContent(); }
    return this.renderPublicContent();
  }

  renderPrivateContent() {
    return (
      <div>
        <p className={s.description}>This is where the magic happens and you are good to go!</p>
      </div>
    );
  }

  renderPublicContent() {
    return (
      <div>
        <p className={s.description}>This is where the magic happens and in order to be a part of the magic you need to login. <br/> Use your Uptive account to sign in.</p>
        <div className={s.buttonContainer}>
          <Button className={s.loginButton} href="/login/google">Sign in</Button>
        </div>
      </div>
    );
  }
}
/*
<p>- or -</p>
<a href=""> Sign in with token</a>
*/

export default withStyles(s)(Home);
