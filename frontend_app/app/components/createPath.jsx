import BaseComponent from '../lib/baseComponent';
import React from 'react';
import CreatePathNode from './createPathNode.jsx';
import CreatePathTitle from  './createPathTitle.jsx';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    width: 400,
    margin: 20,
};

const contentWrapStype = {
    padding: 20
}

module.exports = BaseComponent.createClass({
    addNode: function(){
        this.props.controllers.createPath.addNode();
    },
    createPath: function(){
        console.log('creating');
    },
	render: function() {
        var self = this;
        if( !this.props.visible ){ return null; }
        var nodes = this.props.path.get('nodes').map(function(node, index){
            return <CreatePathNode
                        controllers={self.props.controllers}
                        key={index}
                        node={node}
                        index={index} />
        });
		return <div>
            <Paper style={style} zDepth={2} >
                <Toolbar name={"foo"}>
                    <ToolbarTitle text="New Path" />
                </Toolbar>
                <div style={contentWrapStype}>
                    <CreatePathTitle
                        controllers={this.props.controllers}
                        error={this.props.path.get('titleError')}
                        title={this.props.path.get('title')}
                    />
                    {nodes}
                    <a onClick={this.addNode}>
                        <FlatButton label="Add Node" primary={true} />
                    </a>
                    <a onClick={this.createPath}>
                        <RaisedButton
                            label="Create"
                            secondary={true}
                            disabled={!this.props.path.get('valid')}
                            style={{float: 'right'}} />
                    </a>
                </div>
            </Paper>
		</div>;
	}
});