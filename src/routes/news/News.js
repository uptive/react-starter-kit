import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './News.css';
import { getNews, createNews } from '../../actions/news';
import EditButton from '../../components/Action/ActionButton';
import ActionMenu from '../../components/Action/ActionMenu';
import CreateNews from '../../components/News/CreateNews';
import Loading from 'react-loader';

class News extends Component {

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state =  {
      news: this.context.store.getState().news.data || null,
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
    });
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
          <CreateNews/>
          <ActionMenu>
            {this.renderCreateButton() }
          </ActionMenu>
        </div>
      </Layout>
    );
  }

  renderCreateButton(){
    if(!this.state.news){return;}
    return (<EditButton text="Add" icon="plus" onClick={this.handleCreateContentChange.bind(this)}/>);
  };
}

function renderNewsItems(news){

  var options = {
    lines: 20,
    length: 20,
    width: 3,
    radius: 25,
    scale: 1.00,
    corners: 0.9,
    color: '#000',
    opacity: 0.20,
    rotate: 0,
    direction: 1,
    speed: 1,
    trail: 60,
    fps: 20,
    zIndex: 2e9,
    top: '60%',
    left: '50%',
    shadow: false,
    hwaccel: false,
    position: 'absolute'
  };

  if(!news){ return (<Loading loaded={false} options={options} className="spinner" ></Loading>); }

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
