import BaseComponent from '../lib/baseComponent';
import React from 'react';
import CreatePathNode from './createPathNode.jsx';
import CreatePathTitle from  './createPathTitle.jsx';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';

const STYLE = {
    margin: 20,
};

const STYLE_CONTENT_WRAP = {
    padding: 20
};

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

        var affirmRadio = null;
        if( this.props.responseTo ){
            affirmRadio =
            <RadioButtonGroup
                onChange={this.controllers}
                name="affirmRadio"
                defaultSelected="affirm" >
                <RadioButton
                    value="affirm"
                    label="Affirm"
                />
                <RadioButton
                    value="negate"
                    label="Negate"
                />
            </RadioButtonGroup>
        }

		return <div>
            <Paper style={STYLE} zDepth={1} >
                <Toolbar name={"foo"}>
                    <ToolbarTitle text="New Path" />
                </Toolbar>
                {affirmRadio}
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