import BaseComponent from '../lib/baseComponent';
import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

const STYLE = {marginBottom: 20};

module.exports = BaseComponent.createClass({
	onBlur: function(e){
		this.props.controllers.createPath.validateForm(this._getOptions());
	},
	handleTextChange: function(e){
		var d = this._getOptions();
        d.statement = e.target.value;
		this.props.controllers.createPath.updateNodeStatement(d);
	},
    handleDelete: function(e){
        this.props.controllers.createPath.deleteNode(this._getOptions());
    },
    handleMoveUp: function(e){
        this.props.controllers.createPath.moveNodeUp(this._getOptions());
    },
    handleMoveDown: function(e){
        this.props.controllers.createPath.moveNodeDown(this._getOptions());
    },
    _getOptions: function(e){
        return {
            dataLocation: this.props.dataLocation,
            index: this.props.index
        };
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

        var upIcon = null;
        var downIcon = null;
        if( !this.props.isSignleNode ){
            if( !this.props.isFirstNode ){
                upIcon = <IconButton onClick={this.handleMoveUp}>
                    <i className="material-icons">arrow_upward</i>
                </IconButton>
            }
            if( !this.props.isLastNode ){
                downIcon = <IconButton onClick={this.handleMoveDown}>
                    <i className="material-icons">arrow_downward</i>
                </IconButton>
            }
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
                    {downIcon}
                    {upIcon}
                    <IconButton onClick={this.handleDelete}>
                        <i className="material-icons">close</i>
                    </IconButton>
            </Paper>
		</div>;
	}
});