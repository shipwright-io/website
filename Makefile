.PHONY: all build travis

all: build

build:
	rm -rf public/*
	hugo -t docsy --minify

serve:
	hugo -t docsy server

travis:
	hack/install-hugo.sh
	npm install
