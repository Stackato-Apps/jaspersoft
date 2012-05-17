TouchController = function(element,parent,options) {
	var it = this;
	this.element = element;
	this.parent = parent;
	this.children = [];		
	/*
	 * Constructor parameters: absolute translate3d, forceLayout, debug, useParent
	 */
	options = options || {};
	options.absolute ? this.element.style.position = 'absolute' :  this.element.style.position = 'relative';
	
	this.useParent = options.useParent ? this.observer = parent : this.observer = element;
	this.translate3d = options.translate3d !== false ? true : false;
	this.forceLayout = options.forceLayout !== true ? false : true;
	this.use2Fingers = options.use2Fingers !== true ? false : true;
	this.fit = options.fit;
	
	if(options.debug){
	  	parent.style.border = 'solid 1px #f00';
		element.style.border = 'solid 1px #00f';		
		console.info('Px: ' + parent.clientWidth + ', Ex: ' + element.clientWidth + 'Dx: ' + (parent.clientWidth - element.clientWidth));
		console.info('Py: ' + parent.clientHeight + ', Ey: ' + element.clientHeight + 'Dy: ' + (parent.clientHeight - element.clientHeight));
	}
	
	if(this.translate3d && !options.noInit3d) {
		var pos = jQuery(element).position();
		element.style.webkitTransform = 'translate3d('+pos.left+'px,'+pos.top+'px,0)';
		element.style.top = '';
		element.style.left = '';
	}
	
	this.dragging = false;
	this.drag_sensitivity = 20;
	this.scale = 1.0;
	
	this.element.style.top = 0;
	this.element.style.left = 0;
	this.maxX = 0;
	this.maxY = 0;
  	this.startTouchY = 0;
  	this.startTouchX = 0;
	this.contentOffsetX = 0;
  	this.contentOffsetY = 0;
  	
  	this.observer.addEventListener('touchstart', this, false);
  	this.observer.addEventListener('touchmove', this, false);
  	this.observer.addEventListener('touchend', this, false);
}
TouchController.prototype.handleEvent = function(e) {
	switch (e.type) {
		case 'touchstart':
	    	this.onTouchStart(e);
	      	break;
	    case 'touchmove':
	      	this.onTouchMove(e);
	      	break;
	    case 'touchend':
	      	this.onTouchEnd(e);
	      	break;
	}
}
TouchController.prototype.onTouchStart = function(e) {
	this.scale_pre = false;
	
	this.maxX = this.parent.clientWidth - this.element.clientWidth;
  	this.maxY = this.parent.clientHeight - this.element.clientHeight;

  	this.maxX = this.maxX < 0 ? this.maxX : 0;
  	this.maxY = this.maxY < 0 ? this.maxY : 0;
  	this.startTouchX = e.touches[0].clientX;
  	this.startTouchY = e.touches[0].clientY;
  
  	this.contentStartOffsetX = this.contentOffsetX;
  	this.contentStartOffsetY = this.contentOffsetY;
}
TouchController.prototype.onTouchMove = function(e) {
	var cy = e.touches[0].clientY;
	var cx = e.touches[0].clientX;
	
	if(!this.use2Fingers || (this.use2Fingers && e.touches.length == 2)) {
		if(this.dragging) {
			this.animateTo(cx,cy);
		} else {
		  	if (this.isDragging(e)) {
		  		TouchController.element_scrolled = true;
		  		if(this.forceLayout){
		  			this.element.style.top = 0;
		  			this.element.style.webkitTransform = 'translate3d(0,'+this.contentOffsetY+'px,0)';
		  		}
		    	this.animateTo(cx,cy);
		  	}		
		}
	}
}

TouchController.prototype.onTouchEnd = function(e) {
  	if (this.dragging) {
  		if(this.forceLayout){
  	  		this.element.style.webkitTransform = 'translate3d(0,0,0)';
  	  		this.element.style.top = this.contentOffsetY + 'px';  			
  		}
  		e.preventDefault();
  		
    	if (this.shouldStartMomentum()) {
      		//this.doMomentum();
    	} else {
      		//this.snapToBounds();
    	}
  	}
  	this.dragging = false;
}

TouchController.prototype.animateTo = function(cX,cY) {
	var deltaX = cX - this.startTouchX;
	var deltaY = cY - this.startTouchY;
	var offsetX = deltaX + this.contentStartOffsetX;
	var offsetY = deltaY + this.contentStartOffsetY;

	var pos = jQuery(this.element).position();
	
	if(this.translate3d) {
		if(offsetX > 0) offsetX = 0;
		if(offsetY > 0) offsetY = 0;
		if(offsetX < this.maxX) offsetX = this.maxX;
		if(offsetY < this.maxY) offsetY = this.maxY;
	} else {
		if(offsetX + pos.left > 0) offsetX = -1*pos.left;
		if(offsetY + pos.top > 0) offsetY = -1*pos.top;
		if(pos.left + offsetX < this.maxX) offsetX = this.maxX - pos.left;
		if(pos.top + offsetY < this.maxY) offsetY = this.maxY - pos.top;	
	}
	
	this.contentOffsetX = offsetX;
	this.contentOffsetY = offsetY;
	
	if(this.translate3d || this.use2Fingers) {		
		this.element.style.webkitTransform = 'scale('+this.scale+') translate3d('+ offsetX + 'px,' + offsetY + 'px, 0)';
	} else {
		this.element.style.top = pos.top + offsetY + 'px';
		this.element.style.left = pos.left + offsetX + 'px';
	}
}
TouchController.prototype.isDragging = function(e) {
	var dx = e.touches[0].clientX - this.startTouchX;
	var dy = e.touches[0].clientY - this.startTouchY;
	var adx = Math.abs(dx);
	var ady = Math.abs(dy);
	this.dragging = (adx > this.drag_sensitivity || ady > this.drag_sensitivity) ? true : false;
	return this.dragging;
}
TouchController.prototype.shouldStartMomentum = function() {
	return false;
}
TouchController.prototype.reset = function() {
    offsetX = this.contentOffsetX;
    offsetY = this.contentOffsetY;
    
	this.maxX = this.parent.clientWidth - this.element.clientWidth;
  	this.maxY = this.parent.clientHeight - this.element.clientHeight;
  	
	if(this.translate3d) {
		this.element.style.webkitTransform = 'scale('+this.scale+') translate3d('+ offsetX + 'px,' + offsetY + 'px, 0)';
		this.element.style.webkitTransform = 'scale('+this.scale+') translate3d(0,0,0)';
		this.contentOffsetX = 0;
	  	this.contentOffsetY = 0;
	} else {
		this.element.style.top = 0;
		this.element.style.left = 0;
	}
}
TouchController.prototype.forceRefresh = function() {
	//this.element.style.webkitTransform = 'scale('+this.scale+') translate3d(0,100px, 0)';
	//this.element.style.webkitTransform = 'scale('+this.scale+') translate3d(0,0,0)';
}
TouchController.prototype.isBottom = function() {
	if(this.maxY >= 0) {
		return false
	} else {
		return (this.contentOffsetY - this.maxY) < 10;
	}
}
TouchController.prototype.addPadding = function(id,padding) {
	var w = jQuery('#'+id).width() + padding.right;
	var h = jQuery('#'+id).height() + padding.bottom;
	this.element.style.width = w +'px';
	this.element.style.height = h +'px';
}

