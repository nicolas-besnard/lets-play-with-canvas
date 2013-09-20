window.engine.AnimationSheet = engine.Class.extend({
	image: null,

	init: function(path, width, height) 
	{
		this.width = width;
		this.height = height;

		this.image = new engine.Image(path);
	}
});

window.engine.Animation = engine.Class.extend({
	sheet: null,
	angle: 0,
	tile: 0,
	frame: 0,


	init: function(sheet, frameTime, sequence)
	{
		this.sheet = sheet;
		this.frameTime = frameTime;
		this.pivot = {x: sheet.width / 2, y: sheet.height / 2};
		this.sequence = sequence;
		this.tile = this.sequence[0];
	},

	update: function (dt)
	{
		this.frame += this.frameTime * dt;
	},

	draw: function (targetX, targetY)
	{
		var index = Math.floor(this.frame);
		this.tile = this.sequence[index % this.sequence.length];
		if (this.angle == 0)
		{
			this.sheet.image.drawTile(
				targetX, targetY,
				this.tile, 
				this.sheet.width, this.sheet.height
			);
		}
		else
		{
			engine.context.save();
			engine.context.translate(
				targetX + this.pivot.x,
				targetY + this.pivot.y
			);
			engine.context.rotate(this.angle);
			this.sheet.image.drawTile(
				-this.pivot.x, -this.pivot.y,
				this.tile,
				this.sheet.width, this.sheet.height
			);
			engine.context.restore();
		}
	}
});