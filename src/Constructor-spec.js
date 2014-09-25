(function(test) {
	if (typeof define == 'function' && define.amd) {
		define(['spawnjs/Constructor', 'spawnjs/index'], test);
	} else if (typeof exports == 'object') {
		test(require('./Constructor'), require('./index'));
	} else {
		test(spawn.Constructor, spawn);
	}
}(function(Constructor, spawn) {
	describe('Constructor', function() {
		it('is a function', function() {
			Constructor.should.be.a('function');
		});

		describe('instanceof', function() {
			var instance = new Constructor();

			describe('#spawn()', function() {
				it('is the base spawn method', function() {
					var child = instance.spawn();
					instance.isPrototypeOf(child).should.equal(true);
				});
			});
		});

		describe('#spawn()', function() {
			var ChildConstructor = Constructor.spawn({
				method1: function() {},
				prop1: 'Property'
			});

			describe('return value', function() {
				it('is a function', function() {
					ChildConstructor.should.be.a('function');
				});

				it('has all passed properties in its prototype chain', function() {
					ChildConstructor.prototype.method1.should.be.a('function');
					ChildConstructor.prototype.prop1.should.equal('Property');
				});

				describe('#new()', function() {
					var instance = new ChildConstructor();

					it('is instanceof Constructor', function() {
						instance.should.be.instanceof(Constructor);
					});
				});
			});
		});
	});
}));
