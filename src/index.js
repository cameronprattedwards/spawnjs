define([], function() {
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
});