window.engine.Image = engine.Class.extend({
	data: null,
	path: null,
	isLoaded: false,
	width: 0,
	height: 0,

	staticInstantiate: function(path)
	{
		return engine.Image.cache[path] || null;
	},

	init: function(path)
	{
		this.path = path;
		this.load();
	},

	onload: function (event)
	{
		this.width = this.data.width;
		this.height = this.data.height;
		this.isLoaded = true;
	},

	onerror: function (event)
	{
		alert("error img");
	},

	reload: function ()
	{
		this.isLoaded = false;
		this.data = new Image();
		this.data.onload = this.onload.bind(this);
		this.data.src = this.path + '?' + Date.now();
	},

	load: function ()
	{
		this.data = new Image();
		this.data.onload = this.onload.bind(this);
		this.data.onerror = this.onerror.bind(this);
		this.data.src = this.path;
	},

	draw: function (targetX, targetY, sourceX, sourceY, width, height)
	{
		if (!this.isLoaded)
		{
			return ;
		}
		engine.context.drawImage(
			this.data, 
			sourceX, sourceY,
			width, height,
			targetX, targetY,
			width, height
		);
	},

	drawTile: function (targetX, targetY, tile, tileWidth, tileHeight)
	{
		if (!this.isLoaded)
		{
			return ;
		}
		engine.context.drawImage(
			this.data,
			(Math.floor(tile * tileWidth) % this.width),
			Math.floor(tile * tileWidth / this.width) * tileHeight,
			tileWidth,
			tileHeight,
			targetX, 
			targetY,
			tileWidth,
			tileHeight
		);
	}
});

engine.Image.drawCount = 0;
engine.Image.cache = {};
engine.Image.reloadCache = function ()
{
	for (var path in engine.Image.cache)
	{
		engine.Image.cache[path].reload();
	}
}

engine.Image.isReady = function ()
{
	for (var path in engine.Image.cache)
	{
		if (engine.Image.cache[path].isLoaded == false)
		{
			return false;
		}
	}
	return true;
}