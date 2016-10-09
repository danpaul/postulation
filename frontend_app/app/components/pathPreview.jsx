import BaseComponent from '../lib/baseComponent';
import React from 'react';
import config from '../config';

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
	render: function() {
		var nodes = [];
		this.props.path.get('path').forEach(function(i){
			if( i.get('type') === 'node' && !i.get('hidden') ){
				nodes.push(i);
			}
		});

		var pathLink = config.siteUrl + '/path/get/' + this.props.path.get('id');
        // var title = <a href={pathLink}><h4>
        //     {this.props.path.get('title')}
        // </h4></a>;
        var title = this.props.path.get('title');
        var subtitle = '0.25 1/4 — 2016-07-07 12:38';

        return <div style={STYLE}>
            <Card onExpandChange={this.handleExpandChange}>
                <CardHeader
                    title={title}
                    subtitle={subtitle}
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