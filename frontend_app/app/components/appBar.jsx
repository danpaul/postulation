import BaseComponent from '../lib/baseComponent';
import React from 'react';
import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';
import page from 'page';

module.exports = BaseComponent.createClass({
	handleTitleClick: function(){
		// console.log('handleTitleClick')
		page('/');
	},
	handleLoginClick: function(){
		this.props.controllers.user.showLogin();
	},
	handleLogoutClick: function(){
		this.props.controllers.user.logout();
	},
	handleLeftIconButtonTouchTap: function(){
		this.props.controllers.drawer.toggle();
	},
	render: function() {

		var loginButton = null;
		var logoutButton = null;

		if( this.props.user.get('id') ){
			logoutButton = <FlatButton
				label="Logout"
				onClick={this.handleLogoutClick} />
		} else {
			loginButton = <FlatButton
				label="Login/Register"
				onClick={this.handleLoginClick} />
		}


		return <div>
			<AppBar
				title={<span style={{cursor: 'pointer'}}>Postulation</span>}
				onTitleTouchTap={this.handleTitleClick}
				onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap}
				iconElementRight={loginButton ? loginButton : logoutButton}
			/>
		</div>;
	}
});