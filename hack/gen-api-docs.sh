#! /bin/bash

set -e

genRoot="$(pwd)/api-gen"
crdRefDocs="$(pwd)/bin/crd-ref-docs"
destRoot="$(pwd)/content/en/docs/ref/api"

buildRepo=${BUILD_REPO:-"https://github.com/shipwright-io/build"}
buildVersion=${BUILD_VERSION:-"v0.15.0"}


pushd "${genRoot}"

if [ -d "build" ]; then
    rm -rf build
fi

git clone --branch "${buildVersion}" --depth 1 "${buildRepo}" "build"

API_GROUP="Build" API_WEIGHT="10" ${crdRefDocs} --config build.yaml \
  --renderer markdown \
  --source-path "build/pkg/apis/build/v1beta1" \
  --output-path "${destRoot}/build.md" \
  --templates-dir "${genRoot}/templates/markdown"

popd
