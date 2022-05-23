.PHONY: all build install netlify

all: build

build:
	rm -rf public/*
	hugo -t docsy --minify

serve:
	hugo -t docsy server

install:
	bundle
	npm install

netlify:
	git submodule update --init --recursive --depth 1
	$(MAKE) install
	$(MAKE) build
