import BaseComponent from '../lib/baseComponent';
import React from 'react';
import CreatePathNode from './createPathNode.jsx';
import CreatePathTitle from  './createPathTitle.jsx';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const STYLE = {
    margin: 20,
};

const STYLE_CONTENT_WRAP = {
    padding: 20
};

module.exports = BaseComponent.createClass({

    getNodes: function(){
        var self = this;
        return this.props.path.get('nodes').map(function(node, index){
            return <CreatePathNode
                        dataLocation={self.props.path.get('dataLocation')}
                        form={self.props.form}
                        controllers={self.props.controllers}
                        key={index}
                        node={node}
                        index={index} />
        });
    },
    getResponseNode: function(){
        if( this.props.responseTo &&
            this.props.responseIsAffirming &&
            this.props.responseTo.get('type') === 'node' ){

            return <CreatePathNode
                isDisabled={true}
                node={this.props.responseTo}
            />
        }
    },
    addNode: function(){
        var d = {dataLocation: this.props.path.get('dataLocation')};
        this.props.controllers.createPath.addNode(d);
    },
    createPath: function(){
        var d = {dataLocation: this.props.path.get('dataLocation')};
        this.props.controllers.createPath.handleCreateClick(d);
    },
    selectAffirm: function(){
        this.props.controllers.createPath.setResponseAffirm();
    },
    selectNegate: function(){
        this.props.controllers.createPath.setResponseNegate();
    },
    getAffirmNegateButtons: function(){
        if( !this.props.responseTo ){ return null; }
        return <div>
            <RaisedButton
                label="Affirm"
                secondary={this.props.responseIsAffirming}
                onClick={this.selectAffirm} />
            <RaisedButton
                label="Negate"
                secondary={!this.props.responseIsAffirming}
                onClick={this.selectNegate} />
        </div>
    },
	render: function() {
        var self = this;
		return <div>
            <Paper style={STYLE} zDepth={1} >
                <Toolbar name={"create-path"}>
                    <ToolbarTitle text="New Path" />
                </Toolbar>
                {this.getAffirmNegateButtons()}
                <div style={STYLE_CONTENT_WRAP}>
                    <CreatePathTitle
                        controllers={this.props.controllers}
                        dataLocation={this.props.path.get('dataLocation')}
                        error={this.props.path.get('titleError')}
                        title={this.props.path.get('title')}
                    />
                    {this.getNodes()}
                    {this.getResponseNode()}
                    <FlatButton
                        onClick={this.addNode}
                        label="Add Node"
                        primary={true} />
                    <RaisedButton
                        onClick={this.createPath}
                        label="Create"
                        secondary={true}
                        disabled={!this.props.path.get('valid')}
                        style={{float: 'right'}} />
                </div>
            </Paper>
		</div>;
	}
});