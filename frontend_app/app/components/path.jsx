import BaseComponent from '../lib/baseComponent';
import React from 'react';
// import PathItemDetail from './pathItemDetail.jsx';
import PathLink from './pathLink.jsx';
import PathNode from './pathNode.jsx';
import PathVote from './pathVote.jsx';
import Paper from 'material-ui/Paper';
import helpers from '../lib/helpers';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import config from '../config';

const STYLE = { margin: 20,
                width: 800,
                // padding: 10,
                float: 'left'   };

// var count = 0;

// var Path = BaseComponent.createClass({
//     render: function(){
//         count++;
//         return <div>
//             <div>foo</div>
//             { count < 5 ? <Path /> : null}

//         </div>
//     }
// });
// 
var Node = BaseComponent.createClass({
    handleNodeClick: function(e){

// console.log('this.props.location', this.props.location.toJS());
// return;

        var d = {item: this.props.node, location: this.props.location};

        // this should be renamed, maybe?
        this.props.controllers.path.setDetailItem(d);

        // if( !this.props.focused ){
        //     this.props.controllers.path.setDetailItem(d);
        // } else {
        //     this.props.controllers.path.unsetDetailItem(d);
        // }       
    },
    render: function(){

// asdf
// console.log('response and affirm');
if( this.props.responsesAffirm ){
    console.log(this.props.responsesAffirm.toJS());
}
// console.log(this.props.responsesNegate);

        var affirmPaths = null;
        if( this.props.responsesAffirm ){
            var self = this;

            affirmPaths = this.props.responsesAffirm.map(function(el, index){
                return <Path
                    key={index}
                    controllers={self.props.controllers}
                    user={self.props.user}
                    path={el}
                />

            });
        }

        var negatePaths = null;
        if( this.props.responsesNegate ){
            var self = this;

            negatePaths = this.props.responsesNegate.map(function(el, index){
                return <Path
                    key={index}
                    controllers={self.props.controllers}
                    user={self.props.user}
                    path={el}
                />

            });
        }

// console.lo

        return <div onClick={this.handleNodeClick}>
            {this.props.node.get('statement')}
            {affirmPaths}
            {negatePaths}
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

        var self = this;
        var nodes = this.props.path.get('path');
        var location = this.props.path.get('location').push('path');

        return nodes.map(function(el, index){

            if( el.get('type') === 'node' ){
                var next = nodes.get(index + 1);
                var link = next ? next : null;
                if( link ){
                    link = link.set('location', location.push(index + 1));
                }

                var isConclusion = nodes.size === (index + 1);

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
        // console.log(this.props.path.toJS())

        return <div style={STYLE_PATH_WRAP}>
            <div>{this.props.path.get('title')}</div>
            {this.getNodes()}
        </div>
    }
});

var STYLE_PATH_WRAP = {'marginLeft': '5%'};


// module.exports = BaseComponent.createClass({
//     getEllements: function(){
//         var self = this;

//         let paths = this.props.path.get('path');
//         const location = this.props.path.get('location').push('path');
// console.log('asdf 30')
//         return paths.map(function(el, index){
//             if( el.get('type') === 'node' ){                
//                 var next = paths.get(index + 1);
//                 var link = next ? next : null;
//                 if( link ){
//                     link = link.set('location', location.push(index + 1));
//                 }
//                 var isConclusion = paths.size === (index + 1);
//                 var focused = false;
// console.log('asdf 31')
//                 return <PathNode
//                     key={index}
//                     node={el}
//                     user={self.props.user}
//                     focused={focused}
//                     controllers={self.props.controllers}
//                     link={link}
//                     isConclusion={isConclusion}
//                     location={location.push(index)}
//                     responsesAffirm={el.get('responsesAffirm')}
//                     responsesNegate={el.get('responsesNegate')}
//                 />
//             }
//         });
//     },
//     render: function() {

// // console.log('this.props.path', this.props.path.toJS())
// // console.log('asdf 40')

//         return <div>
//             <div style={{marginLeft: 20}}>
//                 <h1>{this.props.path.get('title')}</h1>
//                 <h3>
//                     { helpers.ranking.getRankingString(this.props.path) }
//                 </h3>
//                 <PathVote
//                     user={this.props.user}
//                     controllers={this.props.controllers}
//                     path={this.props.path}
//                 />
//             </div>
//             <Paper style={STYLE} zDepth={1}>
//                 {this.getEllements()}
//             </Paper>
//         </div>
//     }
// });