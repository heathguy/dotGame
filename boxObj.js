class boxObj {
	constructor(_x, _y, _c, _l1, _l2, _l3, _l4) {
		this.centerX = _x;
		this.centerY = _y;
		this.topLine = _l1;
		this.rightLine = _l2;
		this.leftLine = _l3;
		this.bottomLine = _l4;
		this.boxColor = _c;
	}

	setColor(_c) {
		this.boxColor = _c;
	}
}