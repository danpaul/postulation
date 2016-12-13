import BaseComponent from '../lib/baseComponent';
import React from 'react';
import Paper from 'material-ui/Paper';
import helpers from '../lib/helpers';

import FlatButton from 'material-ui/FlatButton';
import config from '../config';

const labelStyle = {
    fontSize: 14,
    fontWeight: 'bold'
};

module.exports = BaseComponent.createClass({
    componentDidMount: function(){
        this.props.controllers.vote.get({   type: 'path',
                                            id:  this.props.path.get('id') });
    },
    handleAffirmVote: function(e){
        if( this.props.path.get('userVote') ){ return; }
        this.props.controllers.vote.add({   type: 'path',
                                            id: this.props.path.get('id'),
                                            true: true  });
    },
    handleNegateVote: function(e){
        if( this.props.path.get('userVote') === false ){ return; }
        this.props.controllers.vote.add({   type: 'path',
                                            id: this.props.path.get('id'),
                                            true: false  });
    },
    render: function() {

        let affirmButtonDisabled = this.props.user.get('id') ? false : true;
        let negateButtonDisabled = this.props.user.get('id') ? false : true;
        const userVote = this.props.path.get('userVote');

        if(  userVote !== null && typeof(userVote) !== 'undefined' && this.props.user.get('id') ){
            if( userVote ){
                affirmButtonDisabled = true;
            } else {
                negateButtonDisabled = true;
            }
        }

        return <div style={{marginTop: -10}}>
            <FlatButton
                disabled={affirmButtonDisabled}
                labelStyle={labelStyle}
                label="UPVOTE"
                onClick={this.handleAffirmVote} />
            <FlatButton
                disabled={negateButtonDisabled}
                labelStyle={labelStyle}
                label="DOWNVOTE"
                onClick={this.handleNegateVote} />
        </div>;
    }
});