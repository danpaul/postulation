import BaseComponent from '../lib/baseComponent';
import CreatePath from './createPath.jsx';
import React from 'react';
import Paths from './paths.jsx';

const pathWrapStyle = {
	width: 400,
	marginLeft: 20
}

module.exports = BaseComponent.createClass({
	componentDidMount: function(){
		if( this.props.recentPaths.get('page') === null ){
			this.props.controllers.path.loadRecent({page: 1});
		}
	},
	render: function(){
		return <div>
			<div style={pathWrapStyle}>
				<Paths
					paths={this.props.recentPaths}
				/>
			</div>
			<div>
				<CreatePath
                	controllers={this.props.controllers}
                	path={this.props.createPath}
				/>
			</div>
		</div>
	}
});