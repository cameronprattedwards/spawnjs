(function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define(factory);
	} else if (typeof exports == 'object') {
		module.exports = factory();
	} else {
		root.spawn = factory();
	}
}(this, function() {
	var godObject = {
		spawn: function(props) {
			var output = Object.create(this);
			for (var x in props)
				output[x] = props[x];
			return output;
		}
	};

	return function(props) {
		return godObject.spawn(props);
	}
}));
