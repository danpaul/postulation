import BaseComponent from '../lib/baseComponent';
import React from 'react';
import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';

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
	render: function() {
		return <div>
			<AppBar
				title="Postulation"
				onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap}
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