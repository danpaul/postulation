const debug = false;

const _ = require('underscore');
const config = require('./config');
const Immutable = require('immutable');

const initialState = Immutable.fromJS(require('./schema'));
let data = initialState;
let callbacks = [];
let history = null;
if( config.recordHistory ){
	history = Immutable.List()
					   .push(Immutable.Map({data: data, time: Date.now()}));
}

var mod = {
	set: function(key, value){
		if( Immutable.List.isList(key) ){ key = key.toJS(); }
		if( _.isArray(key) ){
			data = data.setIn(key, mod._coerceValue(value));
		} else {
			data = data.set(key, mod._coerceValue(value));
		}
		if( history ){
			var d = Immutable.Map({data: data, time: Date.now()});
			history = history.push(d);
		}
		if( debug ){
			console.log('Data: ', data.toJS());
		}
		mod._notifyListeners();
	},
	_coerceValue: function(value){
		if( _.isArray(value) || _.isObject(value) ){
			return Immutable.fromJS(value);
		}
		return value;
	},
	getRoot: function(){ return data; },
	get: function(key){
		if( Immutable.List.isList(key) ){ key = key.toJS(); }
		if( _.isArray(key) ){ return data.getIn(key);
		} else { return data.get(key); }
	},
	push(key, item){
		mod.set(key, mod.get(key).push(item));
	},
	reset(key){
		if( _.isArray(key) ){
			var value = initialState.getIn(key);
		} else {
			var value = initialState.get(key);
		}
		mod.set(key, value);
	},
	subscribe: function(callback){ callbacks.push(callback); },
	_notifyListeners: function(){ _.each(callbacks, function(c){ c(); }); },
	startTransition: function(){
		_.each(viewData, function(vd){
			if( _.isObject(initialState[vd]) ){
				mod.set(vd, {});
			} else if( _.isArray(initialState[vd]) ) {
				mod.set(vd, []);
			}
		});
		mod.set('loading', true);
	},
	endTransition: function(){
		mod.set('loading', false);
	}
}

var rewindHistory = function(history, callback){
	var h = history.get(0);
	data = h.get('data');
	mod._notifyListeners();
	if( history.size === 1 ){ return callback(); }
	var timeDifference = h.get('time') - history.get(1).get('time');
	setTimeout(function(){
		rewindHistory(history.shift(), callback);
	}, timeDifference);
}

document.addEventListener('dataRewindHistory', function(e){
	var originalData = data;
	rewindHistory(history.reverse(), function(){
		data = originalData;
		mod._notifyListeners();
		console.log('Done!!!');
	});
}, false);

module.exports = mod;