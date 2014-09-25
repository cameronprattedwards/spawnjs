(function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define(['spawn/index'], factory);
	} else if (typeof exports == 'object') {
		module.exports = factory(require('./index'));
	} else {
		if (typeof root.spawn !== 'function')
			throw new Error('spawn must be loaded before Constructor');

		root.spawn.Constructor = factory(root.spawn);
	}
}(this, function(spawn) {
	var initializing = false,
		fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/,
		utils = {
			isFn: function(obj) {
				return typeof obj == 'function';
			},
			isOverride: function(newFn, oldFn) {
				return utils.isFn(newFn) && utils.isFn(oldFn) && fnTest.test(newFn);
			},
			makeOverride: function(newFn, oldFn) {
				return function() {
					var tmp = this._super,
						ret;

					this._super = oldFn;

					ret = newFn.apply(this, arguments);

					this._super = tmp;

					return ret;
				}
			}
		};
	
	function Constructor() {}

	Constructor.prototype = spawn({
		init: function() {}
	});

	Constructor.spawn = function(newProto) {
		var oldProto,
			x;

		initializing = true;
		oldProto = new this();
		initializing = false;

		for (x in newProto)
			oldProto[x] = utils.isOverride(newProto[x], oldProto[x]) ? utils.makeOverride(newProto[x], oldProto[x]) : newProto[x];

		function Constructor() {
			if (!initializing)
				this.init.apply(this, arguments);
		}

		Constructor.prototype = oldProto;
		Constructor.prototype.constructor = Constructor;
		Constructor.spawn = arguments.callee;

		return Constructor;
	}

	return Constructor;
}));
