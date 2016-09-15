var _ = require('underscore');
var BaseComponent = require('../lib/baseComponent');
// var Header = require('./header.jsx');
// var Loading = require('./loading.jsx');
// var Menu = require('./menu.jsx');
// var Post = require('./post.jsx');
// var Posts = require('./posts.jsx');
var React = require('react');	
// var Url = require('./url.jsx');
// var Immutable = require('immutable');


module.exports = BaseComponent.createClass({
	componentWillMount: function(){
		// this.props.controllers.menu.loadMain();
	},
	render: function() {
		return <div className="container">
<div class="container">
  <div class="grid">
        <div style={{outline: 'solid green'}} className="grid__col grid__col--1-of-4">
foo
        </div>
        <div style={{outline: 'solid blue'}} className="grid__col grid__col--3-of-4">
var
        </div>
        <div style={{outline: 'solid yellow'}} className="grid__col grid__col--6-of-12">

        </div>
  </div>
</div>
		</div>;
	}
});