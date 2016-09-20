const ERRORS = {
	invalidPath: 'Path id is not valid',
	invalidType: 'Type provided is not valid',
	invalidResponseItem: 'Could not locate item for response',
	missingOptions: 'Function called with missing data',
	unknown: 'An unknown error occurred',
	userVoted: 'User has already voted'
};

/**
 * If there is  an error, pass in an `errorCode` params. Define error code
 * 	if it's not already defined above.
 * 	
 * On success, nothing is required, a data param is optional.
 *
 * Callback is optional
 */
module.exports = function(responseIn, callback){
	if( !responseIn ){ responseIn = {}; }
	var response = {
		status: 'success',
		error: null,
		errorCode: null,
		data: null
	};
	if( responseIn.errorCode ){ response.status = 'error'; }
	if( responseIn.data ){ response.data = responseIn.data; }
	if( responseIn.errorCode ){
		response.errorCode = ERRORS[responseIn.errorCode] ?
						     responseIn.errorCode : 'unknown';
		response.error = ERRORS[response.errorCode];
	}
	if( callback ){
		return callback(null, response);
	} else {
		return response;
	}
}