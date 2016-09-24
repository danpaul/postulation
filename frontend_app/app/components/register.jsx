import BaseComponent from '../lib/baseComponent';
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const STYLE = {
    margin: 20,
};

module.exports = BaseComponent.createClass({

    handleSubmit: function(){
        this.props.controllers.user.submitRegisterForm();
    },
    onChangeUsername: function(e){
        this.updateField('username', e.target.value);
    },
    onChangeEmail: function(e){
        this.updateField('email', e.target.value);
    },
    onChangePassword: function(e){
        this.updateField('password', e.target.value);
    },
    onChangeConfirmPassword: function(e){
        this.updateField('confirmPassword', e.target.value);
        this.props.controllers.user.validateRegisterConfirmPassword();
        this.props.controllers.user.validateRegisterForm();        
    },
    onBlurUsername: function(e){
        this.props.controllers.user.validateRegisterUsername();
        this.props.controllers.user.validateRegisterForm();
    },
    onBlurEmail: function(e){
        this.props.controllers.user.validateRegisterEmail();
        this.props.controllers.user.validateRegisterForm();
    },
    onBlurPassword: function(e){
        this.props.controllers.user.validateRegisterPassword();
        this.props.controllers.user.validateRegisterForm();
    },
    updateField: function(field, value){
        var d= {field: field, value: value};
        this.props.controllers.user.updateRegisterFieldValue(d);
    },
	render: function() {
		return <div>
            <Paper style={STYLE} zDepth={1} >
                    <TextField
                        floatingLabelText="Username"
                        value={this.props.formData.get('username')}
                        fullWidth={true}
                        errorText={this.props.formData.get('usernameError')}
                        onChange={this.onChangeUsername}
                        onBlur={this.onBlurUsername}
                    />
                    <TextField
                        floatingLabelText="Email"
                        value={this.props.formData.get('email')}
                        fullWidth={true}
                        errorText={this.props.formData.get('emailError')}
                        onChange={this.onChangeEmail}
                        onBlur={this.onBlurEmail}
                    />
                    <TextField
                        floatingLabelText="Password"
                        value={this.props.formData.get('password')}
                        fullWidth={true}
                        errorText={this.props.formData.get('passwordError')}
                        type="password"
                        onChange={this.onChangePassword}
                        onBlur={this.onBlurPassword}
                    />
                    <TextField
                        floatingLabelText="Confirm Password"
                        value={this.props.formData.get('confirmPassword')}
                        fullWidth={true}
                        errorText={this.props.formData.get('confirmPasswordError')}
                        type="password"
                        onChange={this.onChangeConfirmPassword}
                    />
                    <RaisedButton
                        onClick={this.handleSubmit}
                        label="Register"
                        secondary={true}
                        disabled={!this.props.formData.get('formIsValid')}
                        style={{float: 'right'}} />
            </Paper>
		</div>;
	}
});