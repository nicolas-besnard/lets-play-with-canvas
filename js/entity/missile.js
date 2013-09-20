window.engine.EntityMissile = engine.Entity.extend({
	speed: 400,

	offset:
	{
		x: 46,
		y: 46
	},

	size:
	{
		x: 5,
		y: 40,
	},

	init: function (x, y, settings)
	{
		this.parent(x, y, settings);
		this.velocity.x = Math.cos(this.angle - Math.PI / 2) * this.speed;
		this.velocity.y = Math.sin(this.angle - Math.PI / 2) * this.speed;
		this.image = new engine.Image("img/missile.png");
	},

	update: function (dt)
	{
		this.pos.x += this.velocity.x * dt;
		this.pos.y += this.velocity.y * dt;

		if (this.collide_())
		{
			console.log("BOOM");
			var entity = engine.entities.indexOf(this);
			delete engine.entities[entity];
			engine.entities = _.without(engine.entities, this);
		}
	},

	draw: function()
	{
		engine.context.save();
		engine.context.translate(this.pos.x, this.pos.y);
		engine.context.rotate(this.angle);
		engine.context.drawImage(this.image.data, -this.offset.x, -this.offset.y);         
		engine.context.restore();

		engine.context.save();
		engine.context.translate(this.pos.x + 46 - 5, this.pos.y + 46);
		engine.context.rotate(this.angle);
		engine.context.strokeStyle = "#FF0000";
		engine.context.strokeRect(-this.offset.x, -this.offset.y, this.size.x, this.size.y);
		engine.context.restore();
	},

	collide_: function()
	{
		if ( (Math.abs((this.pos.x - this.offset.x) - (engine.enemy.pos.x - engine.enemy.offset.x)) * 2 < (this.size.x + engine.enemy.size.x)) &&
			(Math.abs((this.pos.y - this.offset.y) - (engine.enemy.pos.y  - engine.enemy.offset.y)) * 2 < (this.size.y + engine.enemy.size.y))
			)  
		{
			return true;
		}
		return false;
	}
});