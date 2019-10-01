import React from 'react';
import './App.css';
import PostList from './PostList';
import convertTime from './convertTime';
import axios from 'axios';
import queryString from 'query-string';

class User extends React.Component {

constructor(props){
	super(props)
	  const parsed = queryString.parse(props.location.search)
	  //console.log(parsed.id)
	  this.state = ({
	  	id: parsed.id,
	  	userData: [],
	  	userPosts: []
	  })
}

componentDidMount(){
// 	FETCH USER META INFORMATION
//   "about" : "This is a test",
//   "created" : 1173923446,
//   "delay" : 0,
//   "id" : "jl",
//   "karma" : 2937,
//   "submitted" : [ 8265435, 8168423, 8090946, 8090326]
	 axios.get(`https://hacker-news.firebaseio.com/v0/user/${this.state.id}.json`) 
     .then(res => {
       const data = res.data;
       //console.log('user post data', data)
       this.setState({
       	userData: data
       })

       const userPostsTrimmed = this.state.userData.submitted.slice(0, 49); //LIMIT TO TOP 50 STORIES
       // FUTURE: figure out pagination or lazy loading of data

       // FETCH USER POST INFORMATION
       userPostsTrimmed.map(post => {
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${post}.json`)
          .then(res => {
            const detail = res.data
            //console.log('detailed post data: ', detail)
            if (detail.deleted){  //don't map over the deleted entries
            	return;
            }
            this.setState({
            userPosts: [...this.state.userPosts, detail ]}) //append each post data to state
          })
        })

   })
}

render(){
	return (
	<div className="App">
		<div className="title">
			<h1>{this.state.id}</h1>
		</div>
		<div className="subtitle">
		joined <b>{convertTime(this.state.userData.created)}</b>, has <b>{this.state.userData.karma} karma</b>
		</div>
		<div className="comment-text">
		<div dangerouslySetInnerHTML={{ __html: this.state.userData.about }} />
		</div>
		
		<div><h2>Posts</h2></div>
		<PostList posts={this.state.userPosts} />
	</div>
	)
	}
}

export default User;