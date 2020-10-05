.PHONY: all build travis

all: build

build:
	rm -rf public/*
	hugo -t docsy --minify

travis:
	hack/install-hugo.sh
	npm install
