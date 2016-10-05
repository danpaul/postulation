import BaseComponent from '../lib/baseComponent';
import React from 'react';
import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';

module.exports = BaseComponent.createClass({
	// getInitialState: function(){
	// 	return {
	// 	popoverOpen: false,
	// 	popoverAnchor: null
	// 	};
	// },
	// handleLeftIconButtonTouchTap: function(e){
	// 	this.setState({popoverOpen: true, popoverAnchor: e.currentTarget});
	// 	console.log('menu clicked');
	// },
	// handlePopoverClose: function(){
	// 	this.setState({popoverOpen: false});

	// },
	handleLoginClick: function(){
		this.props.controllers.user.showLogin();
	},
	handleLogoutClick: function(){
		this.props.controllers.user.logout();
	},
	render: function() {

		var loginButton = null;
		var logoutButton = null;

// asdf
// console.log('this.props.user', this.props.user.toJS());

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
				title="Postulation"
				onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap}
				iconElementRight={loginButton ? loginButton : logoutButton}
			/>
		</div>;
	}
	// render: function() {
	// 	return <div>
	// 		<AppBar
	// 			title="Postulation"
	// 			onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap}
	// 		/>
	//         <Popover
	//           open={this.state.popoverOpen}
	//           anchorEl={this.state.popoverAnchor}
	//           anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
	//           targetOrigin={{horizontal: 'left', vertical: 'top'}}
	//           onRequestClose={this.handlePopoverClose}
	//         >
	//         	TEST
	//         </Popover>
	// 	</div>;
	// }
});