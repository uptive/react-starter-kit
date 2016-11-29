import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './News.css';
import { getNews, createNews, cancelCreateNews } from '../../actions/news';
import { Button, Modal } from 'react-bootstrap';
import EditButton from '../../components/Action/ActionButton';
import ActionMenu from '../../components/Action/ActionMenu';

class News extends Component {

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state =  {
      news: this.context.store.getState().news.data || null,
      create: false,
    };

    this.changeHandler = this.context.store.subscribe(() => this.handleChange(this))
  }

  componentDidMount(){
    this.context.store.dispatch(getNews({token: this.context.store.getState().runtime.jwtToken}));
  }

  componentWillUnmount(){
    if(this.changeHandler){
      this.changeHandler();
    }
  }

  handleChange(){
    this.setState({
      news: this.context.store.getState().news.data,
      create: this.context.store.getState().news.create
    });
  }

  close() {
    this.context.store.dispatch(cancelCreateNews());
  }

  handleCreateContentChange(){
    this.context.store.dispatch(createNews());
  };

  render(){
    return (
      <Layout>
        <div className={s.news}>
          <h1 className={s.heading}>The daily news</h1>
          <div className={s.listContainer}>
            { renderNewsItems(this.state.news) }
          </div>
          <Modal show={this.state.create} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Whats the news?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Text in a modal</h4>
              <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

              </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close.bind(this)}>Close</Button>
            </Modal.Footer>
          </Modal>
          <ActionMenu>
            {this.renderCreateButton() }
          </ActionMenu>
        </div>
      </Layout>
    );
  }

  renderCreateButton(){
    if(!this.state.news){return;}
    return "";//(<EditButton text="Add" icon="plus" onClick={this.handleCreateContentChange.bind(this)}/>);
  };
}

function renderNewsItems(news){
  if(!news){ return; }

  return news.map((item, index) => (
      <div className={s.newsItem} key={index}>
        <h2 className={s.newsItemHeading}>{item.heading}</h2>
        <p className={s.newsItemText}>{item.text}</p>
        <p className={s.newsItemPublished}>{formatDate(item.published)} - <Link to={formatRoute(item.publisherId)} className={s.link}>{item.publisher}</Link></p>
      </div>
  ));
}

function formatRoute(id){
  return "/employee/" + id;
}

function formatDate(unformatted){
  return unformatted.substring(0, 10);
}


export default withStyles(s)(News);
