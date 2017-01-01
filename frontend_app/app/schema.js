const schema = {
	view: '', // see `components/root.jsx` for possible views
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
	drawer: {
		open: false
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
		responses: {
			affirm: [],
			negate: []
		},
		user: null,
		userVote: null,
		location: ['path']
	},
	recentPathsHome: {
		dataLocation: ['recentPathsHome'],
		loading: false,
		page: null,
		paths: []
	},
	trendingPathsHome: {
		dataLocation: ['trendingPathsHome'],
		loading: false,
		page: null,
		paths: []
	},
	snackbar: {
		open: false,
		message: ''
	},
	user: {
		id: null
	}
};

module.exports = schema;