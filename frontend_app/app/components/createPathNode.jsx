import BaseComponent from '../lib/baseComponent';
import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

const STYLE = {marginBottom: 20};

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
    handleDelete: function(e){
        var d = {
            dataLocation: this.props.dataLocation,
            index: this.props.index
        };
        this.props.controllers.createPath.deleteNode(d);
    },
	render: function() {
		if( this.props.isDisabled ){
			return <div>
				<Paper zDepth={0} style={STYLE}>
	            	<TextField
	            		value={this.props.node.get('statement')}
	            		multiLine={true}
	            		fullWidth={true}
	            		disabled={true} />
	            </Paper>
	        </div>
		}
		return <div>
			<Paper zDepth={0} style={STYLE}>
            	<TextField
            		onBlur={this.onBlur}
            		value={this.props.node.get('statement')}
            		multiLine={true}
            		fullWidth={true}
            		errorText={this.props.node.get('error')}
            		onChange={this.handleTextChange} />
                    <IconButton>
                        <i className="material-icons">arrow_downward</i>
                    </IconButton>
                    <IconButton>
                        <i className="material-icons">arrow_upward</i>
                    </IconButton>
                    <IconButton onClick={this.handleDelete}>
                        <i className="material-icons">close</i>
                    </IconButton>
            </Paper>
		</div>;
	}
});