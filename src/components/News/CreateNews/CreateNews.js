import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CreateNews.css';
import { Button, FormControl, Modal } from 'react-bootstrap';
import { cancelCreateNews, saveNews } from '../../../actions/news';


class CreateNews extends Component {
  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state =  {
      jwtToken: context.store.getState().runtime.jwtToken,
      create: false,
      createdNews: {}
    };

    this.changeHandler = this.context.store.subscribe(() => this.handleChange(this));
  }

  handleChange(){
    this.setState({
      create: this.context.store.getState().news.create
    });
  }

  componentDidMount(){
  }

  componentWillUnmount(){
    if(this.changeHandler){
      this.changeHandler();
    }
  }

  setHeading(event){
    var modNews = this.state.createdNews;
    modNews.heading = event.target.value;
    this.setState({createdNews: modNews});
  }

  setText(event){
    var modNews = this.state.createdNews;
    modNews.text = event.target.value;
    this.setState({createdNews: modNews});
  }

  close() {
    this.context.store.dispatch(cancelCreateNews());
  }

  save() {
    var createdNews = this.state.createdNews;
    createdNews.published = new Date();
    createdNews.publisherId = this.context.store.getState().user.username;
    createdNews.publisher = this.context.store.getState().user.name.firstname + " " + this.context.store.getState().user.name.lastname;
    this.context.store.dispatch(saveNews({token: this.context.store.getState().runtime.jwtToken, news: createdNews}));
  }

  render(){
    const { ...props } = this.props;
    return (
      <Modal show={this.state.create} onHide={this.close.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Whats the news?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Header</h5>
          <FormControl placeholder="A short summary goes here" onChange={(e)=>{ this.setHeading(e)}}/>

          <h5>Content</h5>
          <FormControl componentClass="textarea" placeholder="This is where the awesomeness goes." onChange={(e)=>{ this.setText(e)}}/>
          </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close.bind(this)}>Close</Button>
          <Button bsStyle="primary" onClick={this.save.bind(this)}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withStyles(s)(CreateNews);
