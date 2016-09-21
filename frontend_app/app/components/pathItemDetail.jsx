import BaseComponent from '../lib/baseComponent';
import CreatePath from './createPath.jsx';
import PathItemDetailResponses from './pathItemDetailResponses.jsx';
import Paper from 'material-ui/Paper';
import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';


const STYLE = {margin: 20, padding: 10, width: 400, float: 'left'};

module.exports = BaseComponent.createClass({
	render: function() {
        return <Paper style={STYLE} zDepth={2}>
			<Tabs>
				<Tab label="Add" >
					<CreatePath
						controllers={this.props.controllers}
						visible={true}
						responseTo={this.props.detailItem}
						path={this.props.createPath} />
				</Tab>
				<Tab label="Affirming" >
					<PathItemDetailResponses
						affirming={true}
						paths={this.props.detailItemAffirmingPaths}
					/>
				</Tab>
				<Tab label="Negating" >
					<PathItemDetailResponses
						affirming={false}
						paths={this.props.detailItemNegatingPaths}
					/>
				</Tab>
			</Tabs>
        </Paper>;
	}
});