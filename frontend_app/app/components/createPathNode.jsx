import BaseComponent from '../lib/baseComponent';
import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const STYLE = {padding: 10, marginBottom: 20};

module.exports = BaseComponent.createClass({
	onBlur: function(e){
		var d = {dataLocation: this.props.dataLocation};
		this.props.controllers.createPath.validateForm(d);
	},
	handleTextChange: function(e){
		var d = {
			dataLocation: this.props.dataLocation,
			index: this.props.index,
			statement: e.target.value
		};
		this.props.controllers.createPath.updateNodeStatement(d);
	},
	render: function() {
		return <div>
			<Paper zDepth={1} style={STYLE}>
            	<TextField
            		onBlur={this.onBlur}
            		value={this.props.node.get('statement')}
            		multiLine={true}
            		fullWidth={true}
            		errorText={this.props.node.get('error')}
            		onChange={this.handleTextChange} />
            </Paper>
		</div>;
	}
});