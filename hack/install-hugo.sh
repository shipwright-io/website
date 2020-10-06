#!/bin/bash

hugoVersion=${HUGO_VERSION:-0.74.3}
hugoOS=${HUGO_OS:-"Linux"}
tmpDir=${HUGO_TMP_DIR:-"/tmp/hugo-install"}
installDir=${HUGO_INSTALL_DIR:-"$HOME/bin"}

echo "Installing Hugo v${hugoVersion}"
mkdir -p ${tmpDir}
pushd ${tmpDir}
args=""
if [[ -n "${GITHUB_AUTH_SECRET}" && -n "${GITHUB_USERNAME}" ]]; then
    args="--user=${GITHUB_USERNAME} --password=${GITHUB_AUTH_SECRET}"
fi
wget ${args} "https://github.com/gohugoio/hugo/releases/download/v${hugoVersion}/hugo_extended_${hugoVersion}_${hugoOS}-64bit.tar.gz"
tar -xzvf "hugo_extended_${hugoVersion}_${hugoOS}-64bit.tar.gz"
mv hugo ${installDir}
popd
rm -rf ${tmpDir}
