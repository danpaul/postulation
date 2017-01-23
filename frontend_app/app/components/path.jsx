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

const RESPONSE_FORM_STYLE = {padding: "1%"};

var ResponseForm = BaseComponent.createClass({
    render: function(){
        return <div>

        </div>;
    }
});

var ResponseForms = BaseComponent.createClass({
    render: function(){
        const affirmLocation = this.props.location
                                         .push('responses')
                                         .push('affirm');
        const negateLocation = this.props.location
                                         .push('responses')
                                         .push('negate');

// console.log('location', this.props.node.toJS());

        return <div style={RESPONSE_FORM_STYLE}>
            <Paper >
                <Tabs>
                    <Tab label="Support" key="support" >
                        <ResponseForm
                            location={affirmLocation}

                        />
                    </Tab>
                    <Tab label="Refute" key="refute" >
                        <ResponseForm
                            location={negateLocation}
                        />
                    </Tab>
                </Tabs>
            </Paper>
        </div>;
    }
});

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
    _getResponseTabs: function(){
        if( !this.state.responsesVisible ){ return null; }
        return <Paper style={STYLE_PATH_WRAP}>
            <Tabs>
                <Tab label="Respond" key={'responseForms'} >
                    <ResponseForms
                        node={this.props.node} />
                </Tab>
                {['Affirming', 'Negating'].map((label) => {
                    return <Tab label={label} key={label} >
                        <div style={{padding: 10}}>
                            { /** this._getResponsePaths((label === 'Affirming')) */ }
                        </div>
                    </Tab>                
                })}
                { /** this._getReplyTab() */ }
            </Tabs>
        </Paper>;
    },
    _togleResponsePaths: function(){
        this.setState({responsesVisible: !this.state.responsesVisible});
    },
    render: function(){
console.log('node', this.props.node.toJS())
return <div onClick={this.handleNodeClick}>
    <div onClick={this._togleResponsePaths}>
        {this.props.node.get('statement')}
        {this._getResponseTabs()}
    </div>
</div>;
return null;
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
                    node={el}
                    key={index}
                    user={self.props.user}
                    controllers={self.props.controllers}
                />

                // return <Node
                //     node={el}
                //     key={index}
                //     node={el}
                //     user={self.props.user}
                //     controllers={self.props.controllers}
                //     link={link}
                //     isConclusion={isConclusion}
                //     location={location.push(index)}
                //     responsesAffirm={el.get('responsesAffirm')}
                //     responsesNegate={el.get('responsesNegate')}
                // />
            }
        });
    },
    render: function() {
        return <div>
            <div>{this.props.path.get('title')}</div>
            {this.getNodes()}
        </div>;
        // return <div style={STYLE_PATH_WRAP}>
        //     <div>{this.props.path.get('title')}</div>
        //     {this.getNodes()}
        // </div>
    }
});

const STYLE_PATH_WRAP = {'marginLeft': '1%', 'marginRight': '1%'};
const STYLE = { margin: 20,
                width: 800,
                float: 'left'   };