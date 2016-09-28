import BaseComponent from '../lib/baseComponent';
import Paper from 'material-ui/Paper';
import React from 'react';

const STYLE = {padding: 10, cursor: 'pointer'};

module.exports = BaseComponent.createClass({
    componentDidMount: function(){
        this.props.controllers.vote.get({   type: 'node',
                                            id:  this.props.node.get('id') });
    },
	handleNodeClick: function(){
		var d = {item: this.props.node};
		this.props.controllers.path.setDetailItem(d);
	},
    handleAffirmVote: function(e){
        const userVote = this.props.node.get('userVote');
        if( userVote ){ return; }
        this.props.controllers.vote.add({   type: 'node',
                                            id: this.props.node.get('id'),
                                            true: true  });
    },
    handleNegateVote: function(e){
        const userVote = this.props.node.get('userVote');
        if( (userVote !== null || typeof(userVote) !== 'undefined') &&
        	!userVote ){ return; }
        this.props.controllers.vote.add({   type: 'node',
                                            id: this.props.node.get('id'),
                                            true: false  });
    },
	render: function() {
		if( this.props.node.get('hidden') ){ return null; }
		var zDepth = 1;
		if( this.props.focused ){ zDepth = 2; }

        var affirmVoteClass = 'vote-button vote-button_affirm';
        var negateVoteClass = 'vote-button vote-button_negate';


        const userVote = this.props.node.get('userVote');
        if(  userVote !== null && typeof(userVote) !== 'undefined' ){
            if( userVote ){
                affirmVoteClass += ' vote-button_disabled';
            } else {
                negateVoteClass += ' vote-button_disabled';
            }
        }


        return <Paper style={STYLE} zDepth={zDepth} onClick={this.handleNodeClick}>
        	<div>
        		<p>Strength: {this.props.node.get('strength')}</p>
        		<p>Votes: {this.props.node.get('true')} / {this.props.node.get('false')}</p>
                <div
                    onClick={this.handleAffirmVote}
                    className={affirmVoteClass} />
                <div
                    onClick={this.handleNegateVote}
                    className={negateVoteClass} />
        	</div>
            {this.props.node.get('statement')}
        </Paper>;
	}
});