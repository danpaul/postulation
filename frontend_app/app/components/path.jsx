import BaseComponent from '../lib/baseComponent';
import React from 'react';
import PathItemDetail from './pathItemDetail.jsx';
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

module.exports = BaseComponent.createClass({
    getEllements: function(){
        var self = this;

        var detailItemType = null;
        var detailItemId = null;

        if( this.props.detailItem ){
            detailItemType = this.props.detailItem.getIn(['item', 'type']);
            detailItemId = this.props.detailItem.getIn(['item', 'id']);
        }

        let paths = this.props.path.get('path');
        const location = this.props.path.get('location');

        return paths.map(function(el, index){
            if( el.get('type') === 'node' ){                
                let next = paths.get(index + 1);
                let link = next ? next : null;
                if( link ){
                    link = link.set('location', location.push(index + 1));
                }
                let isConclusion = paths.size === (index + 1);

                var focused = false;
                if( detailItemType === 'node' &&
                    el.get('id') === detailItemId ){
                    focused = true;
                }
                return <PathNode
                    key={index}
                    node={el}
                    user={self.props.user}
                    focused={focused}
                    controllers={self.props.controllers}
                    link={link}
                    isConclusion={isConclusion}
                    location={location.push(index)}
                />
            }
        });
    },
    render: function() {
        return <div>
            <div style={{marginLeft: 20}}>
                <h1>{this.props.path.get('title')}</h1>
                <h3>
                    { helpers.ranking.getRankingString(this.props.path) }
                </h3>
                <PathVote
                    user={this.props.user}
                    controllers={this.props.controllers}
                    path={this.props.path}
                />
            </div>
            <Paper style={STYLE} zDepth={1}>
                {this.getEllements()}
            </Paper>
            <PathItemDetail
                controllers={this.props.controllers}
                detailItem={this.props.detailItem}
                user={this.props.user}
            />
        </div>
    }
});