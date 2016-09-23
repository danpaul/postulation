import BaseComponent from '../lib/baseComponent';
import React from 'react';
import Register from './register.jsx';

module.exports = BaseComponent.createClass({
	componentDidMount: function(){
		this.props.controllers.user.init();
	},
	getRegister: function(){
		if( this.props.view !== 'register' ){ return null; }
		return <Register
			formData={this.props.user.get('registerFormData')}
			controllers={this.props.controllers}
			user={this.props.user}
		/>
	},
	render: function() {
		return <div>
			{this.getRegister()}
		</div>
	}
});