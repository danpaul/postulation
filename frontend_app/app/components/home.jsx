import BaseComponent from '../lib/baseComponent';
import React from 'react';
import Paths from './paths.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';

const pathWrapStyle = {
	width: 800,
	margin: 20
}

module.exports = BaseComponent.createClass({
	componentDidMount: function(){
		if( this.props.recentPaths.get('page') === null ){
			this.props.controllers.path.loadRecentHome({page: 1});
		}
	},
	render: function(){
		return <div>
			<Tabs style={pathWrapStyle} >
			    <Tab label="Recent" >
					<div style={{marginTop: 10}}>
						<Paths
							controllers={this.props.controllers}
							paths={this.props.recentPaths}
						/>
					</div>
				</Tab>
			</Tabs>
		</div>
		// return <div>
		// 	<Tabs style={pathWrapStyle} >
		// 	    <Tab label="Recent" >
		// 			<div style={{marginTop: 10}}>
		// 				<Paths
		// 					controllers={this.props.controllers}
		// 					paths={this.props.recentPaths}
		// 				/>
		// 			</div>
		// 		</Tab>
		// 	    <Tab label="Trending" >
		// 			<div style={{marginTop: 10}}>
		// 				<Paths
		// 					controllers={this.props.controllers}
		// 					paths={this.props.recentPaths}
		// 				/>
		// 			</div>
		// 		</Tab>
		// 	</Tabs>
		// </div>
	}
});