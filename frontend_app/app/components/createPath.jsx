import BaseComponent from '../lib/baseComponent';
import React from 'react';
import CreatePathNode from './createPathNode.jsx';
import CreatePathTitle from  './createPathTitle.jsx';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const STYLE = {
    width: 400,
    margin: 20,
};

const STYLE_CONTENT_WRAP = {
    padding: 20
}

module.exports = BaseComponent.createClass({
	render: function() {
        var self = this;
        var c = this.props.controllers;
        if( !this.props.visible ){ return null; }

        var nodes = this.props.path.get('nodes').map(function(node, index){
            return <CreatePathNode
                        controllers={self.props.controllers}
                        key={index}
                        node={node}
                        index={index} />
        });
		return <div>
            <Paper style={STYLE} zDepth={2} >
                <Toolbar name={"foo"}>
                    <ToolbarTitle text="New Path" />
                </Toolbar>
                <div style={STYLE_CONTENT_WRAP}>
                    <CreatePathTitle
                        controllers={c}
                        error={this.props.path.get('titleError')}
                        title={this.props.path.get('title')}
                    />
                    {nodes}
                    <FlatButton
                        onClick={c.createPath.addNode.bind(c.createPath)}
                        label="Add Node"
                        primary={true} />
                    <RaisedButton
                        onClick={c.createPath.handleCreateClick.bind(c.createPath)}
                        label="Create"
                        secondary={true}
                        disabled={!this.props.path.get('valid')}
                        style={{float: 'right'}} />
                </div>
            </Paper>
		</div>;
	}
});