class lineObj {
	constructor(_x,_y,_c,_t,_w,_h) {
		this.centerX = _x;
		this.centerY = _y;
		this.lineColor = _c;
		this.isActive = _t;	
		this.width = _w;
		this.height = _h;
	}

	setColor(_c) {
		this.lineColor = _c;
	}
}