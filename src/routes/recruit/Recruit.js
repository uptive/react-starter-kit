import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Date from '../../components/Date';
import s from './Recruit.css';
import { FormControl , InputGroup, Glyphicon, Button, Badge } from 'react-bootstrap';
import { findRecruits, getRecruit } from '../../actions/recruit';
import FontAwesome from 'react-fontawesome';

class Recruit extends Component {

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state =  {
      recruit: {}
    };
    this.changeHandler = this.context.store.subscribe(() => this.handleChange(this));
  }

  componentDidMount(){
    this.context.store.dispatch(getRecruit({id: this.props.id, token: this.context.store.getState().runtime.jwtToken}));
  }


  componentWillUnmount(){
    if(this.changeHandler){
      this.changeHandler();
    }
  }

  handleChange(){
    this.setState({
      recruit: this.context.store.getState().recruits.recruit,
    });
  }

  render(){
    return (
      <Layout>
        <div className={s.root}>
          <div className={s.container}>
            <h3>{ this.state.recruit.firstname } { this.state.recruit.lastname }</h3>

            {this.renderComments()}
          </div>
        </div>
      </Layout>
    );
  }

  renderComments(){
    if(!this.state.recruit || !this.state.recruit.comments){ return; }
    return (
      <div className={s.commentBox}>
        <h5>Comments</h5>
        <ul className={s.comments}>
          {this.state.recruit.comments.map((item, index) => (
            <li key={index}>
              <div>
                <div><Date>{item.date}</Date> - {item.user}</div>
                <div>{item.text}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withStyles(s)(Recruit);
