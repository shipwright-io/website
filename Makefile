.PHONY: all build travis deploy

all: build

build:
	rm -rf public/*
	hugo -t docsy --minify

travis:
	hack/install-hugo.sh
	npm install

deploy:
	hack/deploy.sh
