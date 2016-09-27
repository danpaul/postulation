import BaseComponent from '../lib/baseComponent';
import React from 'react';
import PathItemDetail from './pathItemDetail.jsx';
import PathLink from './pathLink.jsx';
import PathNode from './pathNode.jsx';
import PathTitle from './pathTitle.jsx';
import Paper from 'material-ui/Paper';

const STYLE = { margin: 20,
                width: 400,
                padding: 10,
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

        return this.props.path.get('path').map(function(el, index){
            if( el.get('type') === 'node' ){
                var focused = false;
                if( detailItemType === 'node' &&
                    el.get('id') === detailItemId ){
                    focused = true;
                }
                return <PathNode
                    key={index}
                    node={el}
                    focused={focused}
                    controllers={self.props.controllers}
                />
            } else {
                var focused = false;
                if( detailItemType === 'link' &&
                    el.get('id') === detailItemId ){
                    focused = true;
                }
                return <PathLink
                    key={index}
                    link={el}
                    focused={focused}
                    controllers={self.props.controllers}
                />
            }
        });
    },
	render: function() {
        return <div>
            <Paper style={STYLE} zDepth={1}>
                <PathTitle
                    controllers={this.props.controllers}
                    path={this.props.path}
                />
                {this.getEllements()}
            </Paper>
            <PathItemDetail
                controllers={this.props.controllers}
                detailItem={this.props.detailItem}
            />
        </div>
	}
});