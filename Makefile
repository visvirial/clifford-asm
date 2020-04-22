
all: clifford.js

clean:
	rm -f clifford.js

clifford.js: clifford.c
	emcc -O2 -s WASM=1 -s SINGLE_FILE=1 -s ALLOW_MEMORY_GROWTH=1 -o $@ $<

