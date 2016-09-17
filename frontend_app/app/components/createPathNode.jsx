import BaseComponent from '../lib/baseComponent';
import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const STYLE = {padding: 10, marginBottom: 20};

module.exports = BaseComponent.createClass({
	handleTextChange: function(e){
		var d = {index: this.props.index, statement: e.target.value};
		this.props.controllers.createPath.updateNodeStatement(d);
	},
	render: function() {
		return <div>
			<Paper zDepth={1} style={STYLE}>
            	<TextField
            		onBlur={this.props.controllers.createPath.validateForm}
            		value={this.props.node.get('statement')}
            		multiLine={true}
            		fullWidth={true}
            		errorText={this.props.node.get('error')}
            		onChange={this.handleTextChange} />
            </Paper>
		</div>;
	}
});