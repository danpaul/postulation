import BaseComponent from '../lib/baseComponent';
import Paper from 'material-ui/Paper';
import React from 'react';

const STYLE = {	textAlign: 'center',
				width: 40,
				height: 40,
				margin: '0 auto',
				marginTop: 10,
				marginBottom: 10	};

module.exports = BaseComponent.createClass({
	handleLinkClick: function(){
		var d = {item: this.props.link};
		this.props.controllers.path.setDetailItem(d);
	},
	render: function() {
        return <Paper
        		className="icon-link"
        		style={STYLE}
        		zDepth={this.props.focused ? 2 : 1}
        		circle={true}
        		onClick={this.handleLinkClick} />;
	}
});