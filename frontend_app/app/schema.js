const schema = {
	view: 'home', // see `components/root.jsx` for possible views
	createPath: {
		dataLocation: ['createPath'],
		title: '',
		titleError: '',
		valid: false,
		nodes: []
	},
	detailItem: {
		item: null,
		affirming: [],
		negating: [],
		responseIsAffirming: true,
		responsePath: {
			dataLocation: ['detailItem', 'responsePath'],
			title: '',
			titleError: '',
			valid: false,
			nodes: []
		}
	},
	path: {
		id: null,
		isNegatingResponse: null,
		path: [],
		title: '',
		true: 0,
		false: 0,
		total: 0,
		strength: 0,
		user: null,
		userVote: null
	},
	user: {
		id: null
	}
};

module.exports = schema;