window.engine.EntityEnemy = engine.Entity.extend({
	size: {
		x: 68,
		y: 88
	},

	offset: {
		x: 0,
		y: 12
	},

	init: function (x, y, settings)
	{
		this.parent(x, y, settings);
		this.animSheet = new engine.AnimationSheet("img/heart.png", 68, 88);
		this.anim = new engine.Animation(this.animSheet, 5, [0, 1, 2]);
		
	},

	update: function (dt)
	{
		this.parent(dt);
	},

	draw: function()
	{
		this.parent();
		engine.context.strokeStyle="#FF0000";
		engine.context.strokeRect(this.pos.x - this.offset.x, this.pos.y - this.offset.y, this.size.x, this.size.y);
	}
});

