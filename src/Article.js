import React, { Component } from 'react';
import arrow from './down-icon(cropped).png';
import './Article.css';

class Article extends Component {
  constructor(props) {
    super(props);

    let liked, disliked;

    if (this.props.article.status === 'liked') {
      liked = true;
      disliked = false;
    }
    else if(this.props.article.status === 'disliked') {
      liked = false;
      disliked = true;
    }
    else if(this.props.article.status === 'neutral') {
      liked: false;
      disliked: false;
    }
    else {
      throw 'malformed article status';
    }

    this.state = {
      collapsed: true,
      liked: liked,
      disliked: disliked
    }

    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.getContent = this.getContent.bind(this);
    this.like = this.like.bind(this);
    this.dislike = this.dislike.bind(this);
    this.actionPane = this.actionPane.bind(this);
  }

  toggleCollapse() {
    this.setState(
      (prevState, props) => {
        return {collapsed: !prevState.collapsed}
      }
    );
  }

  getContent() {
    let ret = this.props.article.content;
    if( this.state.collapsed ) {
      ret = ret.slice(0, 140) + " ... ";
    }
    return <div className="story"> {ret} </div>;
  }

  like() {
    console.log('sending:', {article: this.props.article});
    fetch('/api/like', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({article: this.props.article}),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(function (res) {
        console.log('Response to like:', res);
      })
    this.setState(
      (prevState, props) => {
        return {liked: true}
      }
    );
  }

  dislike() {
    console.log('sending:', {article: this.props.article});
    fetch('/api/dislike', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({article: this.props.article}),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(function (res) {
        console.log('Response to dislike:', res);
      })
    this.setState(
      (prevState, props) => {
        return {disliked: true}
      }
    );
  }

  actionPane() {
    if ( !this.state.liked && !this.state.disliked ) {
      return (
        <div className="actionPane">
          <div className="button like" onClick={this.like}>
            approve
          </div>
          <div className="button dislike" onClick={this.dislike}>
            disapprove
          </div>
        </div>
      );
    }
    else if ( this.state.liked ) {
      let renderedProBlurbs = [];
      for (let e in this.props.article.proBlurbs) {
        renderedProBlurbs.push(
          <span className="result" key={e}>
            <img src={this.props.article.proBlurbs[e].imageURL}/>
            <p>{this.props.article.proBlurbs[e].content}</p>
          </span>
        )
      }
      return (
        <div className="actionPane">
          {renderedProBlurbs}
        </div>
      );
    }
    else {
      let renderedConBlurbs = [];
      for (let e in this.props.article.conBlurbs) {
        renderedConBlurbs.push(
          <span className="result" key={e}>
            <img src={this.props.article.conBlurbs[e].imageURL}/>
            <p>{this.props.article.conBlurbs[e].content}</p>
          </span>
        )
      }
      return (
        <div className="actionPane">
          {renderedConBlurbs}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="article">
        <div className="title" style={{backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,219,119,1)), url(' + this.props.article.imageURL + ')'}}>
          {this.props.article.title}
        </div>
        <div className="content">
          {this.getContent()}
          <img className="arrow" collapsed={this.state.collapsed.toString()} src={arrow} onClick={this.toggleCollapse}/>
        </div>
        {this.actionPane()}
      </div>
    )
  }
}

export {
  Article
};
