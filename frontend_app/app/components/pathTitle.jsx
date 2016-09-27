import BaseComponent from '../lib/baseComponent';
import React from 'react';
import Paper from 'material-ui/Paper';

const STYLE_WRAP = { padding: '10px', fontWeight: 'bold' };
const STYLE_RANK = { width: 40, height: 40, textAlign: 'center', fontSize: 16, paddingTop: 4 };
const STYLE_RANK_RATIO = {fontSize: 6, paddingTop: 0, marginTop: -9}

module.exports = BaseComponent.createClass({
    componentDidMount: function(){
        this.props.controllers.vote.get({   type: 'path',
                                            id:  this.props.path.get('id') });
    },
    handleAffirmVote: function(e){
        const userVote = this.props.path.get('userVote');
        if( userVote ){ return; }
        this.props.controllers.vote.add({   type: 'path',
                                            id: this.props.path.get('id'),
                                            true: true  });
    },
    handleNegateVote: function(e){
        const userVote = this.props.path.get('userVote');
        if( userVote !== null && !userVote ){ return; }
        this.props.controllers.vote.add({   type: 'path',
                                            id: this.props.path.get('id'),
                                            true: false  });
    },
	render: function() {
        var affirmVoteClass = 'vote-button vote-button_affirm';
        var negateVoteClass = 'vote-button vote-button_negate';
        const userVote = this.props.path.get('userVote');
        if(  userVote !== null ){
            if( userVote ){
                affirmVoteClass += ' vote-button_disabled';
            } else {
                negateVoteClass += ' vote-button_disabled';
            }
        }

        return <Paper  style={STYLE_WRAP} zDepth={1}>
            <Paper
                style={STYLE_RANK}
                zDepth={1}
                circle={true}>
                <div>
                    {this.props.path.get('strength')}
                </div>
                <div style={STYLE_RANK_RATIO}>
                    {this.props.path.get('true')}/{this.props.path.get('false')}
                </div>
            </Paper>
            <div >
                {this.props.path.get('title')}
                <div
                    onClick={this.handleAffirmVote}
                    className={affirmVoteClass} />
                <div
                    onClick={this.handleNegateVote}
                    className={negateVoteClass} />
            </div>
        </Paper>
	}
});