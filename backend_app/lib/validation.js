const response = require('./response');
const constants = require('../constants');

const charges = {
	affirm: true,
	negate: false
};

const validation = {

	parseLinkGet: function(req, res){

		if( !req.params.id ||
			!Number(req.params.id) ||
			!req.params.type ||
			!validation.isValidType(req.params.type) ||
			!req.params.charge ||
			!validation.isValidCharge(req.params.charge) ){

			res.json(response({errorCode: 'missingRouteParams'}));
			return null;
		}

        return {   	id: Number(req.params.id),
                   	type: req.params.type,
                    charge: charges[req.params.charge]	};
	},

	parsePathCreate: function(req, res){

	},

	isValidCharge: function(charge){
		return( charge && typeof(charges[charge]) !== 'undefined' );
	},

	isValidType: function(type){
		return constants.types[type] ? true : false;
	}

};

module.exports = validation;