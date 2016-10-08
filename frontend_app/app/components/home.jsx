import BaseComponent from '../lib/baseComponent';
import CreatePath from './createPath.jsx';
import React from 'react';
import Paths from './paths.jsx';
import PathsWrap from './pathsWrap.jsx';

const pathWrapStyle = {
	width: 400,
	marginLeft: 20
}

module.exports = BaseComponent.createClass({
	componentDidMount: function(){
		if( this.props.recentPaths.get('page') === null ){
			this.props.controllers.path.loadRecentHome({page: 1});
		}
	},
	render: function(){
		return <div>
			<div style={pathWrapStyle}>
				<PathsWrap
					title="Recent Paths"
					>
					<Paths
						paths={this.props.recentPaths}
					/>
				</PathsWrap>
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