window.engine.EntityPlayer = engine.Entity.extend({

	size: 
	{
		x: 24,
		y: 24
	},

	offset:
	{
		x: 8,
		y: 8
	},

	init: function (x, y, settings)
	{
		this.parent(x, y, settings);
		this.animSheet = new engine.AnimationSheet("img/ship.png", 24, 24);
		this.anim = new engine.Animation(this.animSheet, 5, [0, 1, 2]);
	},

	update: function (dt)
	{
		this.parent(dt);
		this.handleInput();
		this.angle = engine.angleTo({x: input.mouse.x, y: input.mouse.y}, {x: this.pos.x, y : this.pos.y}) + Math.PI / 2;
		this.anim.angle = this.angle;
		
	},

	draw: function()
	{
		this.parent();
		engine.context.strokeStyle = "#FF0000";
		engine.context.strokeRect(this.pos.x - this.offset.x, this.pos.y - this.offset.y, this.size.x, this.size.y);
	},

	handleMovement_: function()
	{
		if (input.isPressed("left"))
		{
			this.velocity.x = -this.speed;
		}
		else if (input.isPressed("right"))
		{
			this.velocity.x = this.speed;
		}
		else 
		{
			this.velocity.x = 0;
		}

		if (input.isPressed('up')) 
		{
			this.velocity.y = -this.speed;
		}
		else if (input.isPressed('down')) 
		{
			this.velocity.y = this.speed;
		} 
		else 
		{
			this.velocity.y = 0;
		}
	},

	handleShoot_: function()
	{
		if (input.isPressed("shoot"))
		{
			var settings = {
				angle: this.angle + Math.random() * 0.1 - 0.05
			};
			var missile = new engine.EntityMissile(this.pos.x + 3, this.pos.y + 3, settings);
			engine.addEntity(missile);
		}
	},

	handleInput: function()
	{
		this.handleMovement_();
		this.handleShoot_();
	}
});