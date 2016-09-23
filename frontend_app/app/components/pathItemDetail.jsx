import BaseComponent from '../lib/baseComponent';
import CreatePath from './createPath.jsx';
import PathItemDetailResponses from './pathItemDetailResponses.jsx';
import Paper from 'material-ui/Paper';
import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

const STYLE = {margin: 20, width: 400, float: 'left'};

module.exports = BaseComponent.createClass({
	render: function() {
		if( !this.props.detailItem.get('item') ){ return null; }
        return <Paper style={STYLE} zDepth={1}>
			<Tabs>
				<Tab label="Add" >
					<CreatePath
						controllers={this.props.controllers}
						visible={true}
						responseIsAffirming={this.props.detailItem.get('responseIsAffirming')}
						responseTo={this.props.detailItem.get('item')}
						path={this.props.detailItem.get('responsePath')} />
				</Tab>
				<Tab label="Affirming" >
					<PathItemDetailResponses
						affirming={true}
						paths={this.props.detailItem.get('affirming')}
					/>
				</Tab>
				<Tab label="Negating" >
					<PathItemDetailResponses
						affirming={false}
						paths={this.props.detailItem.get('negating')}
					/>
				</Tab>
			</Tabs>
        </Paper>;
	}
});