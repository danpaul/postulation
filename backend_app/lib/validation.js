const _ = require('underscore');
var response = require('./response');
const constants = require('../constants');

// asdf
// setInterval(function(){
// 	console.log(response);
// }, 100);

const charges = {
	affirm: true,
	negate: false
};

const validationConstraints = {
	pathTitleMax: 255,
	pathTitleMin: 3,
	nodeMinLength: 3,
	nodeMaxLength: 1024
};

module.exports = function(){

	this.parseLinkGet = function(req, res){

		if( !req.params ||
			!req.params.id ||
			!Number(req.params.id) ||
			!req.params.type ||
			!this.isValidType(req.params.type) ||
			!req.params.charge ||
			!this.isValidCharge(req.params.charge) ){

			res.json(response({errorCode: 'missingRouteParams'}));
			return null;
		}

        return {   	id: Number(req.params.id),
                   	type: req.params.type,
                    charge: charges[req.params.charge]	};
	}

	this.parsePathCreate = function(req, res){

		var cleanPath = {};
		if( !req || !req.body ){
			res.json(response({errorCode: 'missingRouteParams'}));
			return null;
		}

		if( !req.body.title ||
			!_.isString(req.body.title) ){

			res.json(response({errorCode: 'pathTitleInvalid'}));
			return null;
		}

		if( req.body.title.length < validationConstraints.pathTitleMin ){
			res.json(response({errorCode: 'pathTitleTooShort'}));
			return null;
		}

		if( req.body.title.length > validationConstraints.pathTitleMax ){
			res.json(response({errorCode: 'pathTitleTooLong'}));
			return null;
		}

		cleanPath.title = req.body.title;
		if( !_.isBoolean(req.body.charge) ){
			res.json(response({errorCode: 'pathChargeInvalid'}));
			return null;	
		}

		cleanPath.charge = req.body.charge;
// asdf
// console.log('req.body.nodes', req.body.nodes)

		var resp = this.parsePathNodes(req.body.nodes);
// console.log('resp', resp)
		if( _.isString(resp) ){
			res.json(response({errorCode: response}));
			return null;
		}

		cleanPath.nodes = resp;
		return cleanPath;
	}

	/**
	 * @param  {array}  pathArray
	 * @return  {array/string}  returns path array if valid else a string error code
	 */
	this.parsePathNodes = function(nodes){
		var cleanNodes = [];
		if( !nodes || !_.isArray(nodes) ){ return 'pathNodesInvalid'; }
		for( var i = 0; i < nodes.length; i++ ){
			var n = nodes[i];
			if( i === (nodes.length - 1)  && !_.isString(n) ){
				// var cleanNode = {};
				if( !_.isObject(n) ||
					!n.id ||
					!Number(n.id) ||
					!n.type ||
					!this.isValidType(n.type) ||
					n.type === constants.types.path ){
					return 'pathNodeInvalid';
				}
				cleanNodes.push({id: n.id, type: n.type});
			} else {
				var resp = this.nodeStringIsValid(n);
				if( resp !== true ){ return resp; }
				cleanNodes.push(n);
			}
		}
		return cleanNodes;
	}

	/**
	 * @return  {true/string}  `true` on valid, string error code on invalid
	 */
	this.nodeStringIsValid = function(node){
		if( !node || !_.isString(node) ){
			return('pathNodeInvalid');
		}
		if( node.length < validationConstraints.nodeMinLength ){
			return 'pathNodeTooShort';
		}
		if( node.length > validationConstraints.nodeMaxLength ){
			return 'pathNodeTooLong';
		}
		return true;
	}

	this.isValidCharge = function(charge){
		return( charge && typeof(charges[charge]) !== 'undefined' );
	},

	this.isValidType = function(type){
		return constants.types[type] ? true : false;
	}

};