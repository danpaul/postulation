var BaseComponent = require('../lib/baseComponent');
var React = require('react');

module.exports = BaseComponent.createClass({
	goHome: function(){
		this.props.router.navigate({view: 'home'});
	},
	render: function() {
		return <div style={{marginBottom: '2rem'}}>
			<h1 onClick={this.goHome} style={{marginBottom: '0'}}>{this.props.site.get('title')}</h1>
			<small>{this.props.site.get('description')}</small>
		</div>;
	}
});