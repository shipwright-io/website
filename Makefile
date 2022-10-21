.PHONY: all
all: build

.PHONY: build
build: clean ## build the site
	hugo -t docsy --minify

.PHONY: build-preview
build-preview: clean ## build a preview, with future-dated content allowed.
	hugo -t docsy -F --minify

.PHONY: clean
clean: ## clean the build assets
	rm -rf public/*

.PHONY: install
install: ## install dependencies
	bundle
	npm install

.PHONY: netlify
netlify: submodule-init ## build the site for Netlify
	git submodule update --init --recursive --depth 1
	$(MAKE) install
	$(MAKE) build

.PHONY: netlify-preview
netlify-preview: submodule-init ## build a preview of the site for Netlify
	$(MAKE) install
	$(MAKE) build-preview

.PHONY: serve
serve: ## serve the content locally for testing
	hugo -t docsy server

.PHONY: serve-preview
serve-preview: ## serve the preview content locally for testing
	hugo -t docsy server -F

.PHONY: submodule-init
submodule-init:
	git submodule update --init --recursive --depth 1
