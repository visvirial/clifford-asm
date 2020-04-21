
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <math.h>
#include <emscripten.h>

#define WIDTH (640)
#define HEIGHT (480)
#define REPEAT (1000000)

#define xy(x, y) ((y) * WIDTH + (x))

EMSCRIPTEN_KEEPALIVE
void draw_clifford(uint32_t *pixels, const double a, const double b, const double c, const double d) {
	for(size_t i=0; i<WIDTH*HEIGHT; i++) {
		pixels[i] = 0;
	}
	double x = 0;
	double y = 0;
	for(size_t i=0; i<REPEAT; i++) {
		const double xx = sin(a * y) + c * cos(a * x);
		const double yy = sin(b * x) + d * cos(b * y);
		uint32_t xi = floor(0.5 * (xx + 1. + fabs(c)) / (1. + fabs(c)) * WIDTH);
		uint32_t yi = floor(0.5 * (yy + 1. + fabs(d)) / (1. + fabs(d)) * HEIGHT);
		pixels[xy(xi, yi)]++;
		x = xx;
		y = yy;
	}
}

