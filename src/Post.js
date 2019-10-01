import React from 'react';
import './App.css';
import Comment from './Comment';
import convertTime from './convertTime';
import axios from 'axios';
import { Link } from "react-router-dom";
import queryString from 'query-string';


class Post extends React.Component {

constructor(props){
	super(props)
	const parsed = queryString.parse(props.location.search)
	this.state = {
		id: parsed.id,
		postData: [],
		comments: []
	}
}

componentDidMount(){
// pull in story data from HN API
  // DATA STRUCTURE:
  // "by" : "dhouston",
  // "descendants" : 71,
  // "id" : 8863,
  // "kids" : [ 8952, 9224, 8917, 8884, 8887]
  // "score" : 111,
  // "time" : 1175714200,
  // "title" : "My YC app: Dropbox - Throw away your USB drive",
  // "type" : "story",
  // "url" : "http://www.getdropbox.com/u/2/screencast.html"
// FUTURE: check if already in redux store and only fetch if not

   axios.get(`https://hacker-news.firebaseio.com/v0/item/${this.state.id}.json`) 
     .then(res => {
       const post = res.data;
       this.setState({
       	postData: post
       })
       //console.log('step 1', this.state.postData)
       // map over "kids" array, then fetch in additional data for each
  		post.kids.map(comment => {
          //console.log('step 2', comment)
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${comment}.json`)
          .then(res => {
            const comment = res.data
            //console.log('step 3', comment)
            if (comment.deleted){  //don't map over the deleted entries
            	return;
            }
            this.setState({
            comments: [...this.state.comments, comment ] 
          	})
          })
      	})
   	})
}

render(){

return (
	<div className="App">
		<div className="title">
			<a href={this.state.postData.url}>
				<h1>{this.state.postData.title}</h1>
			</a>
		</div>
		<div className="subtitle">
			by <Link to={`/user?id=${this.state.postData.by}`}>{this.state.postData.by}</Link> on {convertTime(this.state.postData.time)} with <Link to={`/post?id=${this.state.postData.id}`}>{this.state.postData.descendants}</Link> comments
		</div>
		<div>
		<ul>
		{this.state.comments.map(comment => 
			<li key={comment.id}>
			<Comment 
				text={comment.text}
				author={comment.by}
				timestamp={comment.time}
				commentsCount={comment.descendants}
				id={comment.id}	
			/>
			</li>
		)}
		</ul>
		</div>
	</div>
)

}

}

export default Post;