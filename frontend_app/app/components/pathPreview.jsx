import BaseComponent from '../lib/baseComponent';
import React from 'react';
import config from '../config';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

const STYLE = {};

module.exports = BaseComponent.createClass({
    handleExpandChange: function(){
console.log('handleExpandChange');
    },
	render: function() {

		var nodes = [];
		this.props.path.get('path').forEach(function(i){
			if( i.get('type') === 'node' && !i.get('hidden') ){
				nodes.push(i);
			}
		});
		var pathLink = config.siteUrl + '/path/get/' + this.props.path.get('id');


        return <div>
<Card expanded={true} onExpandChange={this.handleExpandChange}>
  <CardHeader
    title="Test title"
    subtitle="Test subtitle"
    actAsExpander={true}
    showExpandableButton={true}
  />

    <CardText expandable={false}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
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