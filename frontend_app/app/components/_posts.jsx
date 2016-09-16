var BaseComponent = require('../lib/baseComponent');
var Post = require('./post.jsx');
var React = require('react');

module.exports = BaseComponent.createClass({
	goBack: function(){
		this.props.router.goBack();
	},
	goForward: function(){
		this.props.router.goForward();
	},
	render: function() {
		var self = this;
		if( !this.props.posts.size ){ return null; }
		var previousButton = null;
		if( this.props.currentPage &&  this.props.currentPage !== 1 ){
			previousButton = <a onClick={this.goBack} className="button float-left">Previous</a>
		}
		var nextButton = null;
		if( this.props.currentPage &&  this.props.perPage === this.props.posts.size ){
			nextButton = <a onClick={this.goForward} className="button float-right">Next</a>
		}
		return <div>
			{this.props.posts.map(function(post){
				return <Post
						key={post.get('id')}
						post={post}
						router={self.props.router} />
			})}
			{previousButton}
			{nextButton}
		</div>;
	}
});