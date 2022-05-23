#!/bin/bash

hugoVersion=${HUGO_VERSION:-0.99.1}
hugoOS=${HUGO_OS:-"Linux"}
tmpDir=${HUGO_TMP_DIR:-"/tmp/hugo-install"}
installDir=${HUGO_INSTALL_DIR:-"$HOME/bin"}

echo "Installing Hugo v${hugoVersion}"
mkdir -p ${tmpDir}
pushd ${tmpDir}
wget "https://github.com/gohugoio/hugo/releases/download/v${hugoVersion}/hugo_extended_${hugoVersion}_${hugoOS}-64bit.tar.gz"
tar -xzvf "hugo_extended_${hugoVersion}_${hugoOS}-64bit.tar.gz"
mkdir -p ${installDir}
mv hugo ${installDir}
popd
rm -rf ${tmpDir}
