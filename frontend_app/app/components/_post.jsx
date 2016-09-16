var BaseComponent = require('../lib/baseComponent');
var Contact = require('./contact.jsx');
var React = require('react');
var config = require('../config.js');

module.exports = BaseComponent.createClass({
	gotoPost: function(){
		if( this.props.isPage ){ return; }
		this.props.router.navigate({p: this.props.post.get('id')});
	},
	isContactPage(){
		return( this.props.post.get('type') === 'page' &&
				this.props.post.get('slug').toLowerCase() === 'contact' &&
				config.enableContactForm );
	},
	render: function() {
		if( !this.props.post.size ){ return null; }
		var title = this.props.post.getIn(['title', 'rendered']);;
		var content = this.props.post.getIn(['content', 'rendered']);
		var contact = null;
		if( this.isContactPage() ){
			contact = <Contact
						contactForm={this.props.contactForm}
						controllers={this.props.controllers} />
		}

		return <div className="post" style={{paddingBottom: '3rem'}}>
			<h3 onClick={this.gotoPost} style={{marginBottom: 0}}><span dangerouslySetInnerHTML={{__html: title}} /></h3>
			<small style={{display: 'block', marginBottom: '2rem'}}>{this.props.post.get('date')}</small>
			<div dangerouslySetInnerHTML={{__html: content}} />
			{contact}
		</div>;
	}
});