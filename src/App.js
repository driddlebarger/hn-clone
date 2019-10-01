import React from 'react';
import logo from './logo.svg';
import './App.css';
import PostList from './PostList';
import axios from 'axios';


class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      topStories: []
    }
  }

  componentDidMount(){

  //pull in top stories from HN. Refactor this later when adding Redux
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json') //hn top stories IDs
      .then(res => {
        const top = res.data;
        const topTrimmed = top.slice(0, 49); //LIMIT TO TOP 50 STORIES
        //future: figure out pagination OR infinite scroll

        topTrimmed.map(post => {
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${post}.json`)
          .then(res => {
            const detail = res.data
            //console.log(detail)
            this.setState({
            topStories: [...this.state.topStories, detail ]}) //append each post data to state
          })
        })
      })
  }

  render() {
    
    return (
      <div className="App">
      <h2>TOP | <span className="subtitle">NEW</span></h2>
      <PostList posts={this.state.topStories} />
      </div>
    );
  }

}

export default App;
