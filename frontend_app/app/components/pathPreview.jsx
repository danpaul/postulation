import BaseComponent from '../lib/baseComponent';
import React from 'react';
import config from '../config';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

const STYLE = {};

module.exports = BaseComponent.createClass({
    handleExpandChange: function(e){
        // e.stopPropagation();
        var d = {   dataLocation: this.props.dataLocation,
                    index: this.props.index };
        this.props.controllers.path.togglePathPreview(d);
    },
	render: function() {
		var nodes = [];
		this.props.path.get('path').forEach(function(i){
			if( i.get('type') === 'node' && !i.get('hidden') ){
				nodes.push(i);
			}
		});
		var pathLink = config.siteUrl + '/path/get/' + this.props.path.get('id');


var title = <a href={pathLink}><h3>
                {this.props.path.get('title')}
            </h3></a>;

        return <div>
            <Card onExpandChange={this.handleExpandChange}>
                <CardHeader
                    title={title}
                    actAsExpander={false}
                    showExpandableButton={true}
                />

                <CardText expandable={true}>
                    {nodes.map(function(n){
                        return <p key={n.get('id')}>{n.get('statement')}</p>
                    })}
                </CardText>
            </Card>
        </div>;


        // return <div>
        // 	<h3>
        // 		<a href={pathLink}>
        // 			{this.props.path.get('title')}
        // 		</a>
        // 	</h3>
        // 	{nodes.map(function(n){
        // 		return <p key={n.get('id')}>{n.get('statement')}</p>
        // 	})}
        // </div>;
	}
});