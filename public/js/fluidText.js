
	var fluidText = new Class({
	
	Implements: [Events, Options],
	
	Binds: ['resize'],
	
	options: {
		unit: 'px',
		font: { min: 9, max: 14 },
		size: { min: 400, max: 1000 },
		target: document.body,
		windowResize: true,
		getWidth: false
	},
	
	initialize: function(element, options){
		this.setOptions(options);
		this.element = $(element);
		this.target = $(document.body);
		if(this.options.windowResize) window.addEvent('resize', this.resize);
		this.getWidth = (this.options.getWidth) ? this.options.getWidth.bind(this) : function(){ return this.element.getSize().x }.bind(this);
		this.resize();
	},
	
	resize: function(){
		this.fireEvent('resize');
		var width = this.getWidth();
		if( width <= this.options.size.min ) this.target.setStyle('font-size', this.options.font.min + this.options.unit);
		else if( width >= this.options.size.max ) this.target.setStyle('font-size', this.options.font.max + this.options.unit);
		else {
			var increments = (this.options.size.max - this.options.size.min) / (this.options.font.max - this.options.font.min);
			this.target.setStyle('font-size',
				this.options.font.min + ((width - this.options.size.min) / increments).toInt() + (((width - this.options.size.min) % increments == 0) ? 0 : 1) + this.options.unit
			);
		}
	}
	
});