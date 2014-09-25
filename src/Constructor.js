(function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define(['spawn/index'], factory);
	} else if (typeof exports == 'object') {
		module.exports = factory(require('./index'));
	} else {
		if (typeof root.spawn !== 'function')
			throw new Error('spawn must be loaded before Constructor');

		root.spawn.Constructor = factory(spawn);
	}
}(this, function(spawn) {
	var initializing = false,
		fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	
	function Constructor() {}

	Constructor.prototype = spawn({
		init: function() {}
	});

	function isFn(obj) {
		return typeof obj == 'function';
	}

	function isOverride(prop, proto) {
		return isFn(prop) && isFn(proto) && fnTest.test(prop);
	}

	function makeOverride(fn, proto) {
		return function() {
			var tmp = this._super,
				ret;

			this._super = proto;

			ret = fn.apply(this, arguments);

			this._super = tmp;

			return ret;
		}
	}

	Constructor.spawn = function(props) {
		var proto,
			x;

		initializing = true;
		proto = new this();

		for (x in props)
			proto[x] = isOverride(props[x], proto[x]) ? makeOverride(props[x], proto[x]) : props[x];

		initializing = false;

		function Constructor() {
			if (!initializing)
				this.init.apply(this, arguments);
		}

		Constructor.prototype = proto;
		Constructor.prototype.constructor = Constructor;
		Constructor.spawn = arguments.callee;

		return Constructor;
	}


	return Constructor;
}));