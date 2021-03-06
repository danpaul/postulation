const ERRORS = {
	invalidId: 'ID is invalid',
	invalidNode: 'Node is invalid',
	invalidPath: 'Path id is not valid',
	invalidType: 'Type provided is not valid',
	invalidResponseItem: 'Could not locate item for response',
	missingOptions: 'Function called with missing data',
	missingRouteParams: 'Route called with missing or incorrect data',
	nodeMinSize: 'At least two nodes are required',
	notLoggedIn: 'You must be logged in',
	notAuthorized: 'You are not authorized to perform this action',
	pathChargeInvalid: 'Path charge must be a boolean',
	pathNodeInvalid: 'Invalid or missing path node',
	pathNodeTooShort: 'Path node must be at least 3 characters',
	pathNodeTooLong: 'Path node can not be more thn 1024 characters',
	pathNodesInvalid: 'Invalid or missing path nodes',
	pathTitleInvalid: 'Path title is not valid',
	pathTitleTooShort: 'Path title must be at least 3 characters',
	pathTitleTooLong: 'Path title must be less than 255 characters',
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