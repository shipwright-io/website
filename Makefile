.PHONY: all
all: build

.PHONY: build
build: clean ## build the site
	yarn build

.PHONY: build-preview
build-preview: clean ## build a preview, with future-dated content allowed.
	yarn build

.PHONY: clean
clean: ## clean the build assets
	rm -rf public/*
	rm -rf build/*

.PHONY: install
install: ## install dependencies
	yarn

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
	yarn start

.PHONY: serve-preview
serve-preview: ## serve the preview content locally for testing
	yarn start

.PHONY: bin-dir
bin-dir: ## Creates a local "bin" directory for helper applications.
	@mkdir ./bin || true

.PHONY: crd-ref-docs
crd-ref-docs: bin-dir ## install crd-ref-docs tool
	GOBIN=$(shell pwd)/bin go install github.com/elastic/crd-ref-docs@v0.1.0

BUILD_REPO ?= "https://github.com/shipwright-io/build.git"
BUILD_VERSION ?= "v0.17.0"

.PHONY: gen-api-docs
gen-api-docs: crd-ref-docs ## generate API reference documentation
	BUILD_REPO=$(BUILD_REPO) BUILD_VERSION=$(BUILD_VERSION) ./hack/gen-api-docs.sh
