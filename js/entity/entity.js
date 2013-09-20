window.engine.Entity = engine.Class.extend({
	id    : 0,
	pos   : {x: 0, y: 0},
	last  : {x: 0, y: 0},
	offset: {x: 0, y: 0},
	size  : {x: 0, y: 0},

	speed: 100,
	angle: 0,

	friction: {x: 0, y: 0},
	velocity: {x: 0, y:0 },

	animSheet: null,
	anim     : null,

	init: function(targetX, targetY, settings)
	{
		this.id = ++engine.Entity.lastId;
		this.pos.x = targetX;
		this.pos.y = targetY;
		engine.merge(this, settings);
	},

	update: function(dt)
	{
		this.last.x = this.pos.x;
		this.last.y = this.pos.y;
		this.pos.x += this.velocity.x * dt;
		this.pos.y += this.velocity.y * dt;
	},

	draw: function()
	{
		if (this.animSheet && this.anim)
		{
			this.anim.draw(this.pos.x - this.offset.x, this.pos.y - this.offset.y);
		}
	}
});

engine.Entity.lastId = 0;