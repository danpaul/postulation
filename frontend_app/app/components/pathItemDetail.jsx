import BaseComponent from '../lib/baseComponent';
import CreatePath from './createPath.jsx';
import PathItemDetailResponses from './pathItemDetailResponses.jsx';
import Paper from 'material-ui/Paper';
import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

const STYLE = {margin: 20, width: 400, float: 'left'};
const noPathsDiv = <div>No paths yet!</div>;

module.exports = BaseComponent.createClass({
	getAffirmingPaths: function(){
		if( !this.props.detailItem.get('affirming').size ){
			return noPathsDiv;
		}
		return <PathItemDetailResponses
			affirming={true}
			paths={this.props.detailItem.get('affirming')}
		/>;
	},
	getNegatingPaths: function(){
		if( !this.props.detailItem.get('negating').size ){
			return noPathsDiv;
		}
		return  <PathItemDetailResponses
			affirming={false}
			paths={this.props.detailItem.get('negating')}
		/>;
	},
	render: function() {

// asdf
// console.log('this.props',this.props.detailItem.toJS())

		if( !this.props.detailItem.get('item') ){ return null; }
        return <Paper style={STYLE} zDepth={1}>
			<Tabs>
				<Tab label="Affirming" >
					<div style={{padding: 10}}>
						{ this.getAffirmingPaths() }
					</div>
				</Tab>
				<Tab label="Negating" >
					<div style={{padding: 10}}>
						{ this.getNegatingPaths() }
					</div>
				</Tab>
				{
					this.props.user.get('id') ?
						<Tab label="Reply" >
							<CreatePath
								controllers={this.props.controllers}
								visible={true}
								responseIsAffirming={this.props.detailItem.get('responseIsAffirming')}
								responseTo={this.props.detailItem.get('item')}
								path={this.props.detailItem.get('responsePath')} />
						</Tab>
						: null
				}
			</Tabs>
        </Paper>;
	}
});