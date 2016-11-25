import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './News.css';
import { getNews } from '../../actions/news';

class News extends Component {

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state =  {
      news: this.context.store.getState().news.data || [],
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
      news: this.context.store.getState().news.data
    });
  }

  render(){
    return (
      <Layout>
        <div className={s.news}>
          <h1 className={s.heading}>The daily news </h1>
          <div className={s.listContainer}>
            { renderNewsItems(this.state.news) }
          </div>
        </div>
      </Layout>
    );
  }
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
