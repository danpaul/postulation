import BaseComponent from '../lib/baseComponent';
import React from 'react';
import config from '../config';
import helpers from '../lib/helpers';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

const STYLE = {marginBottom: 10};

module.exports = BaseComponent.createClass({
    handleExpandChange: function(e){
        return;
        // handled inernally by component
        var d = {   dataLocation: this.props.dataLocation,
                    index: this.props.index };
        this.props.controllers.path.togglePathPreview(d);
    },
    getSubtitle: function(){
        return helpers.ranking.getRankingString(this.props.path);
    },
	render: function() {
		var nodes = [];
		this.props.path.get('path').forEach(function(i){
			if( i.get('type') === 'node' && !i.get('hidden') ){
				nodes.push(i);
			}
		});

		var pathLink = config.siteUrl + '/path/get/' + this.props.path.get('id');
        var title = <a style={{fontWeight: 'bold', color: '#000'}} href={pathLink}>
            {this.props.path.get('title')}
        </a>;
        return <div style={STYLE}>
            <Card onExpandChange={this.handleExpandChange}>
                <CardHeader
                    title={title}
                    subtitle={this.getSubtitle()}
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
	}
});