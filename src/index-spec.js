define(['spawn/index'], function(spawn) {
	describe('#spawn()', function() {
		describe('return value', function() {
			it('is an object', function() {
				spawn().should.be.an('object');
			});

			function hasSpawn(obj) {
				obj.spawn.should.be.a('function');
			}

			it('has a spawn method, no matter how deeply you call it', function() {
				hasSpawn(spawn());
				hasSpawn(spawn().spawn());
				hasSpawn(spawn().spawn().spawn());
			});

			it('places itself in prototype chain of its children', function() {
				var parent = spawn(),
					child = parent.spawn();

				parent.isPrototypeOf(child);
			});

			it('contains the properties passed to it as parameters', function() {
				var props = {
						prop1: 'I\'m a property',
						prop2: 'Also a property'
					},
					returnValue = spawn(props);

				returnValue.prop1.should.equal(props.prop1);
				returnValue.prop2.should.equal(props.prop2);
			});

			it('contains the properties of its parent', function() {
				var parent = spawn({
						prop3: 'More properties',
						prop4: 'Properties forever and ever'
					}),
					child = parent.spawn({
						prop5: 'Another property'
					});

				child.prop3.should.equal('More properties');
				child.prop4.should.equal('Properties forever and ever');
				child.prop5.should.equal('Another property');
			});

			it('overrides properties of its parent', function() {
				var parent = spawn({
						geronimo: 'Bombs away!'
					}),
					child = parent.spawn({
						geronimo: 'Cowabunga, dude!'
					});

				child.geronimo.should.equal('Cowabunga, dude!');
				parent.geronimo.should.equal('Bombs away!');
			});
		});
	});
});
