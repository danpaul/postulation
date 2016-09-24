import BaseComponent from '../lib/baseComponent';
import React from 'react';
import Register from './userRegister.jsx';
import Login from './userLogin.jsx';

module.exports = BaseComponent.createClass({
	componentDidMount: function(){
		this.props.controllers.user.init();
	},
	getRegister: function(){
		if( this.props.view === 'register' ){
			return <Register
				formData={this.props.user.get('registerFormData')}
				controllers={this.props.controllers}
				user={this.props.user}
			/>
		}
		return null;
	},
	getLogin: function(){
		if( this.props.view === 'login' ){
			return <Login
				formData={this.props.user.get('loginFormData')}
				controllers={this.props.controllers}
				user={this.props.user}
			/>
		}
		return null;
	},
	render: function() {
		return <div>
			{this.getRegister()}
			{this.getLogin()}
		</div>
	}
});
