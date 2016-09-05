const ERRORS = {
	unknown: 'An unknown error occurred',
	userVoted: 'User has already voted'
};

module.exports = function(responseIn){
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
	return response;
}