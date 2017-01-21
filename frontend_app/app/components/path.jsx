import CreatePath from './createPath.jsx';
import BaseComponent from '../lib/baseComponent';
import React from 'react';
// import PathItemDetail from './pathItemDetail.jsx';
import PathLink from './pathLink.jsx';
import PathNode from './pathNode.jsx';
import PathVote from './pathVote.jsx';
import Paper from 'material-ui/Paper';
import helpers from '../lib/helpers';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import config from '../config';

var Node = BaseComponent.createClass({
    handleNodeClick: function(e){
        var d = {item: this.props.node, location: this.props.location};
        // this should be renamed, maybe?
        this.props.controllers.path.setDetailItem(d);
    },
    getInitialState: function(){
        return {responsesVisible: false};
    },
    _getResponsePaths: function(affirm){
        var paths = null;
        var pathData = affirm ? this.props.responsesAffirm :
                                this.props.responsesNegate;
        if( pathData ){
            var self = this;
            return pathData.map(function(el, index){
                return <Path
                    key={index}
                    controllers={self.props.controllers}
                    user={self.props.user}
                    path={el}
                />
            });
        }
        return null;
    },
    _getReplyTab: function(){
        if( !this.props.user.get('id') ){ return null; }
        return <Tab label="Reply" >
            <CreatePath
                controllers={this.props.controllers}
                visible={true}
                responseIsAffirming={this.props.detailItem.get('responseIsAffirming')}
                responseTo={this.props.detailItem.get('item')}
                path={this.props.detailItem.get('responsePath')} />
        </Tab>
    },
    _getResponseTabs: function(){
        if( !this.state.responsesVisible ){ return null; }
        return <Tabs>
            {['Affirming', 'Negating'].map((label) => {
                return <Tab label={label} key={label} >
                    <div style={{padding: 10}}>
                        {this._getResponsePaths((label === 'Affirming'))}
                    </div>
                </Tab>                
            })}
            {this._getReplyTab()}
        </Tabs>;
    },
    _togleResponsePaths: function(){
        this.setState({responsesVisible: !this.state.responsesVisible});
    },
    render: function(){
        return <div onClick={this.handleNodeClick}>
            <div onClick={this._togleResponsePaths}>
                {this.props.node.get('statement')}
            </div>
            {this._getResponseTabs()}
        </div>;
    }
});

var Path = module.exports = BaseComponent.createClass({
    getPath: function(path){
        return <div>
            <div>{path.get('title')}</div>
        </div>
    },
    getNodes: function(nodes){

    },
    getNodes: function(){

        let self = this;
        let nodes = this.props.path.get('path');
        let location = this.props.path.get('location').push('path');

        return nodes.map(function(el, index){

            if( el.get('type') === 'node' ){
                let next = nodes.get(index + 1);
                let link = next ? next : null;
                if( link ){
                    link = link.set('location', location.push(index + 1));
                }

                let isConclusion = nodes.size === (index + 1);

                return <Node
                    key={index}
                    node={el}
                    user={self.props.user}
                    controllers={self.props.controllers}
                    link={link}
                    isConclusion={isConclusion}
                    location={location.push(index)}
                    responsesAffirm={el.get('responsesAffirm')}
                    responsesNegate={el.get('responsesNegate')}
                />
            }
        });
    },
    render: function() {
        return <div style={STYLE_PATH_WRAP}>
            <div>{this.props.path.get('title')}</div>
            {this.getNodes()}
        </div>
    }
});

const STYLE_PATH_WRAP = {'marginLeft': '5%'};
const STYLE = { margin: 20,
                width: 800,
                float: 'left'   };