#!/bin/bash

# Copyright The Shipwright Contributors
#
# SPDX-License-Identifier: CC-BY-4.0

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

if [[ -n "${GITHUB_AUTH_SECRET}" && -n "${GITHUB_USERNAME}" ]]; then
  echo "Adding GitHub credentials"
  touch "${HOME}/.git-credentials"
  chmod 0600 "${HOME}/.git-credentials"
  echo "${GITHUB_AUTH_SECRET}" > "${HOME}/.git-credentials"

  git config --global credential.helper store
  git config --global user.email "${GITHUB_USERNAME}@users.noreply.github.com"
  git config --global user.name "${GITHUB_USERNAME}"
fi

echo "Updating public submodule to latest version"
git submodule update --remote public

# Build the project.
echo "Building hugo site"
rm -rf public/*
hugo -t docsy --minify

msg="rebuilding site `date`"

# Go To Public folder
pushd public

if [ -z "$(git status --porcelain)" ]; then
  # Add changes to git.
  git add .
  if [ $# -eq 1 ]; then
    msg="$1"
  fi
  git commit -m "$msg"
  git push origin master
fi

# Come Back up to the Project Root
popd

# Update the submodule
if [ -z "$(git status --porcelain)" ]; then
  echo "Local project changes detected. Ensure all project code and submodules are updated in a future commit."
  git status
fi

echo "Done"
