spawnjs
=======

<img src="http://th00.deviantart.net/fs70/PRE/i/2012/049/e/f/spawn_chibi_by_justerneko-d4q4ec5.jpg" width="300px" style="float: left" /> A utility library for prototypal inheritance

`Object.create` is useful for creating new objects using old objects as prototypes. Well, `spawn` goes one step further. Here's an example of how `spawn` can be useful to you:

Say I wanted object `child` to inherit from object `parent`, and I wanted `child` to have some properties of its own. Here's how I would do it using `Object.create()`.

```javascript
var parent = {
	baseProperty: true
};

var child = Object.create(parent);

child.childProperty1 = 3;
child.childProperty2 = "a string";
```

Let's see if we can make that a little more concise, shall we?

```javascript
var parent = spawn({
	baseProperty: true
});

var child = parent.spawn({
	childProperty1: 3,
	childProperty2: "a string"
});
```

That's it! `spawn` simply creates an object based on a prototype, and in turn makes that object spawnable. The word "spawn" also implies creating an offspring that is based on a prototype, but with a mind of its own, as opposed to "extend", which implies that you are adding properties to the original object without creating a new one.

`spawn` also includes a cleaner way of thinking about inheritance of so-called JavaScript "classes," (based on John Resig's inheritance implementation) but calls them, more appropriately, "constructors," and uses "spawn," rather than "extend," to, well, spawn. `extend` makes sense when you're in a classical language where classes extend other classes. But the behavior is fundamentally different in JavaScript, so it needs a different name.

```javascript
var ParentConstructor = spawn.Constructor.spawn({
	newMethod: function() {
		return "I'm from a method!";
	}
});

var ChildConstructor = ParentConstructor.spawn({
	newMethod: function() {
		return this._super() + " And the method is on the child constructor!";
	}
});

```

SpawnJS's source code is only 90 lines long, and the core logic is only 65 lines long. Try it out, and give the source code a read, too!

## Installation

SpawnJS is available via NPM and Bower. Check it out:

```
npm install spawnjs
```

```
bower install spawnjs
```

## Usage

SpawnJS uses universal module loading, so you can load it via RequireJS, CommonJS/Browserify, or just plain old browser globals. Check it out:

#### RequireJS:

You'll need to map a path to "spawnjs" from "bower_components/spawnjs/src":

```javascript
require.config({
	paths: {
		"spawnjs": "bower_components/spawnjs/src"
	}
});

require(["spawnjs/index", "spawnjs/Constructor"], function(spawn, Constructor) {
	console.log("The spawn function is ", spawn);
	console.log("The Constructor spawner is ", Constructor);
});
```

#### CommonJS:
```javascript
var spawn = require("spawnjs"),
	Constructor = require("spawnjs/Constructor");

spawn({ an: "object" });

var MakeConstructor = Constructor.spawn({ add: "methods" });
```

#### Globals:
```html
<script src="bower_components/spawnjs/dist/spawn.min.js"></script>
```

```javascript
var spawn = window.spawn,
	Constructor = window.spawn.Constructor;

spawn({ an: "object" });
var MakeConstructor = Constructor.spawn({ add: "methods" });
```
