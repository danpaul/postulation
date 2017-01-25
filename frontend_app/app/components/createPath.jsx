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
        var size = this.props.path.get('nodes').size;
        return this.props.path.get('nodes').map(function(node, index){
            return <CreatePathNode
                        isFirstNode={index === 0}
                        isSingleNode={size === 1}
                        isLastNode={index === (size - 1)}
                        dataLocation={self.props.path.get('dataLocation')}
                        form={self.props.form}
                        controllers={self.props.controllers}
                        key={index}
                        node={node}
                        index={index} />
        });
    },
    componentWillUnmount: function(){
        const dataLocation = this.props.path.get('dataLocation');
        this.props.controllers.createPath.clearData({dataLocation: dataLocation});
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
        if( !this.props.isResponse ){ return null; }
        return <div>
            <RaisedButton
                style={{width: '50%'}}
                label="Affirm"
                secondary={this.props.responseIsAffirming}
                onClick={this.selectAffirm} />
            <RaisedButton
                style={{width: '50%'}}
                label="Negate"
                secondary={!this.props.responseIsAffirming}
                onClick={this.selectNegate} />
        </div>
    },
	render: function() {

// console.log('this.props', this.props)

        var self = this;
        return <div>
            {this.getAffirmNegateButtons()}
        </div>;

// console.log('this.props', this.props)
// asdf
return null;


        var self = this;
		return <div>
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
		</div>;
	}
});