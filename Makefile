.PHONY: all build travis

all: build

build:
	hugo --minify

travis:
	hack/install-hugo.sh
	npm install
	