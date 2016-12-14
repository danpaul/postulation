import BaseComponent from '../lib/baseComponent';
import Paper from 'material-ui/Paper';
import React from 'react';

import FlatButton from 'material-ui/FlatButton';

import helpers from '../lib/helpers';

const STYLE = {padding: 10, cursor: 'pointer'};

module.exports = BaseComponent.createClass({
    componentDidMount: function(){
        this.props.controllers.vote.get({   type: 'node',
                                            id:  this.props.node.get('id') });
    },
	handleNodeClick: function(e){
		var d = {item: this.props.node};
        if( !this.props.focused ){
            this.props.controllers.path.setDetailItem(d);
        } else {
            this.props.controllers.path.unsetDetailItem(d);
        }		
	},
    handleAffirmVote: function(e){
        e.stopPropagation(); 
        const userVote = this.props.node.get('userVote');
        if( userVote ){ return; }
        this.props.controllers.vote.add({   type: 'node',
                                            id: this.props.node.get('id'),
                                            true: true  });
    },
    handleNegateVote: function(e){
        e.stopPropagation();
        const userVote = this.props.node.get('userVote');
        if( (userVote !== null && userVote !== undefined) && !userVote ){ return; }
        this.props.controllers.vote.add({   type: 'node',
                                            id: this.props.node.get('id'),
                                            true: false  });
    },
    getRankingSection: function(e){
        if( !this.props.focused ){ return null; }
        let affirmButtonDisabled = this.props.user.get('id') ? false : true;
        let negateButtonDisabled = this.props.user.get('id') ? false : true;
        const userVote = this.props.node.get('userVote');
        if(  userVote !== null && typeof(userVote) !== 'undefined' && this.props.user.get('id') ){
            if( userVote ){
                affirmButtonDisabled = true;
            } else {
                negateButtonDisabled = true;
            }
        }
        return <div>
            {helpers.ranking.getRankingString(this.props.node) + ' '}
            <FlatButton
                disabled={affirmButtonDisabled}
                label="UPVOTE"
                onClick={this.handleAffirmVote} />
            <FlatButton
                disabled={negateButtonDisabled}
                label="DOWNVOTE"
                onClick={this.handleNegateVote} />
        </div>;
    },
	render: function() {

// asdf
// console.log('this.props.node.get', this.props.node.toJS());

		if( this.props.node.get('hidden') ){ return null; }
        return <Paper style={STYLE} zDepth={this.props.focused ? 2 : 1} onClick={this.handleNodeClick}>
            {this.props.node.get('statement')}
            {this.getRankingSection()}
        </Paper>;
	}
});