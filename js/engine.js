window.engine = 
{
	fps: 30,
	width: 320,
	height: 240,

	canvas: null,
	context: null,

	lastTime: null,
	gameTime: 0,

	modules: {},
	_current: null,

	interval: null,
	entities: [],
	x:0,
	y:0,

	enemy: null,

	$: function(selector) {
		return selector.charAt(0) == '#'
			? document.getElementById(selector.substr(1))
			: document.getElementsByTagName(selector);
	},

	merge: function(original, extended)
	{
		for (var key in extended)
		{
			if (typeof(extended[key]) != 'object')
			{
				original[key] = extended[key];
			}
		}
	},

	copy: function( object ) {
		if(
		   !object || typeof(object) != 'object' ||
		   object instanceof HTMLElement ||
		   object instanceof engine.Class
		) {
			return object;
		}
		else if( object instanceof Array ) {
			var c = [];
			for( var i = 0, l = object.length; i < l; i++) {
				c[i] = engine.copy(object[i]);
			}
			return c;
		}
		else {
			var c = {};
			for( var i in object ) {
				c[i] = engine.copy(object[i]);
			}
			return c;
		}
	},

	init: function (canvasId, width, height)
	{
		this.canvas = engine.$(canvasId);
		this.context = this.canvas.getContext("2d");

		this.canvas.width = width;
		this.canvas.height = height;
		this.width = width,
		this.height = height;

		this.context.fillStyle="#000000";
		this.context.fillRect(0, 0, canvas.width, canvas.height);

		lastTime = Date.now();
		this.interval = setInterval(this.loop, 1000 / this.fps);

		input.init();
		input.bind(input.KEY.Z, "up");
		input.bind(input.KEY.Q, "left");
		input.bind(input.KEY.S, "down");
		input.bind(input.KEY.D, "right");
		input.bind(input.KEY.SPACE, "shoot");
		this.enemy = new engine.EntityEnemy(engine.width / 2, 64);
		engine.addEntity(this.enemy);
	},

	loop: function ()
	{
		var now = Date.now();
		var dt = (now - lastTime) / 1000.0;

		engine.update(dt);
		engine.draw();
		lastTime = now;
	},

	update: function (dt)
	{
		this.gameTime += dt;
		for (var i = 0; i < this.entities.length; ++i)
		{
			this.entities[i].update(dt);
		}
	},

	draw: function ()
	{
		this.context.fillStyle="#000000";
		this.context.fillRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < this.entities.length; ++i)
		{
			this.entities[i].draw();
		}
	},

	shoot: function ()
	{

	},

	angleTo: function (entity1, entity2)
	{
		return Math.atan2(entity1.y - entity2.y, entity1.x - entity2.x);
	},

	addEntity: function (entity)
	{
		this.entities.push(entity);
	}
};

var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\bparent\b/ : /.*/;
var lastClassId = 0;
window.engine.Class = function(){};

var inject = function(prop) {	
	var proto = this.prototype;
	var parent = {};
	for( var name in prop ) {		
		if( 
			typeof(prop[name]) == "function" &&
			typeof(proto[name]) == "function" && 
			fnTest.test(prop[name])
		) {
			parent[name] = proto[name]; // save original function
			proto[name] = (function(name, fn){
				return function() {
					var tmp = this.parent;
					this.parent = parent[name];
					var ret = fn.apply(this, arguments);			 
					this.parent = tmp;
					return ret;
				};
			})( name, prop[name] );
		}
		else {
			proto[name] = prop[name];
		}
	}
};

window.engine.Class.extend = function(prop) {
	var parent = this.prototype;
 
	initializing = true;
	var prototype = new this();
	initializing = false;
 
	for( var name in prop ) {
		if( 
			typeof(prop[name]) == "function" &&
			typeof(parent[name]) == "function" && 
			fnTest.test(prop[name])
		) {
			prototype[name] = (function(name, fn){
				return function() {
					var tmp = this.parent;
					this.parent = parent[name];
					var ret = fn.apply(this, arguments);			 
					this.parent = tmp;
					return ret;
				};
			})( name, prop[name] );
		}
		else {
			prototype[name] = prop[name];
		}
	}
 
	function Class() {
		if( !initializing ) {
			
			// If this class has a staticInstantiate method, invoke it
			// and check if we got something back. If not, the normal
			// constructor (init) is called.
			if( this.staticInstantiate ) {
				var obj = this.staticInstantiate.apply(this, arguments);
				if( obj ) {
					return obj;
				}
			}
			for( var p in this ) {
				if( typeof(this[p]) == 'object' ) {
					this[p] = engine.copy(this[p]); // deep copy!
				}
			}
			if( this.init ) {
				this.init.apply(this, arguments);
			}
		}
		return this;
	}
	
	Class.prototype = prototype;
	Class.prototype.constructor = Class;
	Class.extend = window.engine.Class.extend;
	Class.inject = inject;
	Class.classId = prototype.classId = ++lastClassId;
	
	return Class;
};