class dotObj {
	constructor(_x,_y,_c,_t) {
		this.x = _x;
		this.y = _y;
		this.dotColor = _c;
		this.isActive = _t;	
	}

	setColor(_c) {
		this.dotColor = _c;
	}
}