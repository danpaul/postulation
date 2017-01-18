import BaseComponent from '../lib/baseComponent';
import CreatePath from './createPath.jsx';
import Path from './path.jsx';
import PathItemDetailResponses from './pathItemDetailResponses.jsx';
import Paper from 'material-ui/Paper';
import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

const STYLE = {width: '100%'};
const noPathsDiv = <div>No paths yet!</div>;

module.exports = BaseComponent.createClass({
    getAffirmingPaths: function(){
        if( !this.props.detailItem.get('affirming').size ){
            return noPathsDiv;
        }
        return <PathItemDetailResponses
            affirming={true}
            paths={this.props.detailItem.get('affirming')}
        />;
    },
    getNegatingPaths: function(){
        if( !this.props.detailItem.get('negating').size ){
            return noPathsDiv;
        }
        return  <PathItemDetailResponses
            affirming={false}
            paths={this.props.detailItem.get('negating')}
        />;
    },
    render: function() {
// console.log('Path', Path)
        var affirming = null;
        var negating = null;
        var self = this;
// console.log('asdf 20')
        if( this.props.affirming ){
            affirming = <div>
                {this.props.affirming.map(function(path){
                    return <Path
                        key={path.get('id')}
                        controllers={self.props.controllers}
                        user={self.props.user}
                        path={path}
                    />
                })}
            </div>;
        }
// console.log('asdf 21')

        // if( !this.props.detailItem.get('item') ){ return null; }
        return <Paper style={STYLE} zDepth={1}>
            <Tabs>
                <Tab label="Affirming" >
                    <div style={{padding: 10}}>{affirming}</div>
                </Tab>
                <Tab label="Negating" >
                    <div style={{padding: 10}}>
                        test two
                    </div>
                </Tab>

            </Tabs>
        </Paper>;
    }

                // {
                //     this.props.user.get('id') ?
                //         <Tab label="Reply" >
                //             <CreatePath
                //                 controllers={this.props.controllers}
                //                 visible={true}
                //                 responseIsAffirming={this.props.detailItem.get('responseIsAffirming')}
                //                 responseTo={this.props.detailItem.get('item')}
                //                 path={this.props.detailItem.get('responsePath')} />
                //         </Tab>
                //         : null
                // }
});