#!/bin/bash

# Please run this script from the root of the project
#
# https://www.shellcheck.net/wiki/Home

echo "linting all shell scripts.."

find . -type f -name "*.sh" -not -path "*/node_modules/*" | while read -r file; do
  echo "checking $file"
  shellcheck "$file"
done
