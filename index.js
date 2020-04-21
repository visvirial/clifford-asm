
const WIDTH = 640;
const HEIGHT = 480;

const draw = (a, b, c, d) => {
	// Allocate memory.
	const ptr = Module._malloc(4 * WIDTH * HEIGHT);
	const heapBytes = new Uint32Array(Module.HEAPU8.buffer, ptr, WIDTH*HEIGHT);
	_draw_clifford(heapBytes.byteOffset, a, b, c, d);
	const canvas = $('#clifford')[0];
	const ctx = canvas.getContext('2d');
	for(var y=0; y<HEIGHT; y++) {
		for(var x=0; x<WIDTH; x++) {
			const density = 255 * (1 - 0.5 * Math.PI * Math.atan(heapBytes[y*WIDTH+x] / 100.));
			ctx.fillStyle = `rgb(${density}, ${density}, ${density})`;
			ctx.fillRect(x, (HEIGHT-y-1), 1, 1);
		}
	}
}

const sleep = async (t) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, t);
	});
}

const init = async () => {
	for(let i=0; ; i++) {
		const r = (i%100) / 200;
		const a = -1.4;
		const b = 1.5 + r;
		const c = 0.9 + r;
		const d = 0.6 + r;
		console.log(a, b, c, d);
		draw(a, b, c, d);
		await sleep(1000);
	}
};

var Module = {
	onRuntimeInitialized: function() {
		init();
	}
};

