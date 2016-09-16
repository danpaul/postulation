import BaseComponent from '../lib/baseComponent';
import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

module.exports = BaseComponent.createClass({
	handleTextChange: function(e){
console.log(e);
console.log(e.currentTarget.value);
	},
	render: function() {
		return <div>
			<Paper zDepth={1} style={{width: 400, margin: 20, padding: 10}}>
            	<TextField multiLine={true} fullWidth={true} onChange={this.handleTextChange} />
            </Paper>
		</div>;
	}
});