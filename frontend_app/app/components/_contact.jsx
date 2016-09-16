var BaseComponent = require('../lib/baseComponent');
var Loading = require('./loading.jsx');
var React = require('react');

module.exports = BaseComponent.createClass({
	render: function() {
		if( this.props.contactForm.get('sending') ){
			return <Loading />;
		}
		if( this.props.contactForm.get('sent') ){
			return <div>Thanks! Your message was sent.</div>;
		}
		return <div>
			<label htmlFor="commentField">Message</label>
    		<textarea onChange={this.props.controllers.contact.updateMessage}
    				  value={this.props.contactForm.get('message')}></textarea>
    		<div style={{color: 'red'}}>{this.props.contactForm.get('error')}</div>
			<input
				className="button-primary"
				onClick={this.props.controllers.contact.submit}
				type="submit"
				value="Send" />
		</div>;
	}
});