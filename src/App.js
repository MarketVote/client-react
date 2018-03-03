import React, { Component } from 'react';
import './App.css';
import {
  Article
} from './Article'
import {
  Menu
} from './Menu'

//this is just some starter test data
/*let articles = [{
  title: "This is an Article Title",
  content: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales pulvinar magna, blandit tempor felis congue ac. Morbi sollicitudin purus et libero convallis congue. Suspendisse blandit, massa id condimentum eleifend, nunc quam blandit enim, venenatis cursus justo nunc et justo. Aenean mollis arcu quis bibendum tristique. Pellentesque iaculis dolor vitae orci viverra congue. Sed ornare tortor eget neque luctus, vitae porta risus dapibus. Praesent euismod a nibh id euismod. Sed sit amet lectus tristique, tempus risus vitae, dignissim libero.\nPraesent et congue nunc. Ut id ipsum rutrum, pulvinar massa non, ornare nisl. Donec ultricies mollis augue, vel dictum dui vestibulum eu. Nullam sit amet odio mattis erat laoreet dictum sed at lacus. Mauris commodo urna quis ornare fermentum. Donec molestie eu tellus in varius. Duis et sem bibendum augue facilisis vehicula. Donec lacus nulla, ornare ac turpis sed, tempus aliquet metus. Aenean commodo fermentum placerat. Vivamus vitae nisi blandit, ullamcorper est a, aliquam dolor. Aenean non turpis est. Nunc a sodales orci. Nam eget ipsum et eros commodo viverra. Fusce fringilla ullamcorper fermentum. Aliquam tempus nisl et lectus sagittis aliquam. Vivamus viverra sagittis efficitur.",
  industryTags: ["coffee", "shoes"],
  issueTags: ["environment", "fair-trade"],
  imageURL: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Golden_Doodle_Standing_%28HD%29.jpg",
  conBlurbs: [
    {
      company: {
        logoURL: "http://1000logos.net/wp-content/uploads/2017/03/Nike-Logo.png",
        name: "Nike"
      },
      content: "Nike doesn't do whatever it is that this article is talking about.",
      clicks: 0
    }
  ],
  proBlurbs: [
    {
      company: {
        logoURL: "https://cdn.dribbble.com/users/989129/screenshots/2390954/smilingdog_1x.png",
        name: "Dog Corp"
      },
      content: "You can help dog corp by sharing this article on social media!",
      clicks: 0
    }
  ],
  likes: 0,
  dislikes: 0,
  state: 'liked'
}];
*/

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      renderedArticles: []
    };
    this.renderArticles = this.renderArticles.bind(this);
    this.requestArticles = this.requestArticles.bind(this);

    this.requestArticles();
  }

  renderArticles() {
    let ret = [];
    console.log('State Articles:', this.state.articles);
    for ( const article in this.state.articles ) {
      ret.push(<Article article={this.state.articles[article]} key={article} />);
    }
    this.setState(
      (prevState, props) => {
        return {renderedArticles: ret}
      }
    );
  }

  requestArticles() {
    //now here's all the code for requesting the articles from the server
    const now = new Date();
    let monthAgo = now;
    monthAgo.setMonth(monthAgo.getMonth()-1);

    const that = this;
    fetch('/api/articles?starting=' + monthAgo.toJSON(), {
      method: 'GET',
      credentials: 'include'
    })
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.json().then(function(data) {
            console.log('Response data:', data);
            that.setState(
              (prevState, props) => {
                return {articles: data.articles}
              }
            );
            that.renderArticles();
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      }); //adapted from Matt Gaunt https://developers.google.com/web/updates/2015/03/introduction-to-fetch
  }

  render() {
    //console.log(document);
    return (
        <div>
          <Menu/>
          <h1 id="header">Your Market News:</h1>
          {this.state.renderedArticles}
        </div>
    );
  }
}

export {
  App
};
