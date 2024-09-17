.PHONY: all
all: build

.PHONY: build
build: clean ## build the site
	hugo -F --minify

.PHONY: build-preview
build-preview: clean ## build a preview, with future-dated content allowed.
	hugo -F --minify

.PHONY: clean
clean: ## clean the build assets
	rm -rf public/*

.PHONY: install
install: ## install dependencies
	bundle
	npm install
	hugo mod get
	hugo mod graph
	hugo mod get github.com/google/docsy

.PHONY: netlify
netlify:
	$(MAKE) install
	$(MAKE) build

.PHONY: netlify-preview
netlify-preview: ## build a preview of the site for Netlify
	$(MAKE) install
	$(MAKE) build-preview

.PHONY: serve
serve: ## serve the content locally for testing
	hugo -t docsy server

.PHONY: serve-preview
serve-preview: ## serve the preview content locally for testing
	hugo -t docsy server -F