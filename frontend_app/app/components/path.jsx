import BaseComponent from '../lib/baseComponent';
import React from 'react';
import PathItemDetail from './pathItemDetail.jsx';
import PathLink from './pathLink.jsx';
import PathNode from './pathNode.jsx';
import Paper from 'material-ui/Paper';

const STYLE = { margin: 20,
                width: 400,
                padding: 10,
                float: 'left'   };

module.exports = BaseComponent.createClass({
    getEllements: function(){
        var self = this;
        return this.props.path.get('path').map(function(el, index){
            if( el.get('type') === 'node' ){
                return <PathNode
                    key={index}
                    node={el}
                    controllers={self.props.controllers}
                />
            } else {
                return <PathLink
                    key={index}
                    link={el}
                    controllers={self.props.controllers}
                />
            }
        });
    },
	render: function() {
        if( !this.props.visible ){ return null; }
        return <div>
            <Paper style={STYLE} zDepth={2}>
                <h3>{this.props.path.get('title')}</h3>
                {this.getEllements()}
            </Paper>
            <PathItemDetail
                controllers={this.props.controllers}
                createPath={this.props.createPath}
                detailItem={this.props.detailItem}
                detailItemAffirmingPaths={this.props.detailItemAffirmingPaths}
                detailItemNegatingPaths={this.props.detailItemNegatingPaths}
            />
        </div>
	}
});