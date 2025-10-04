#!/bin/bash

# Please run this script from the root of the project
#
# https://github.com/mvdan/sh

echo "formatting all shell scripts.."

updated_files=$(
  git diff --name-only
  git ls-files -o --exclude-standard
)

echo "$updated_files" | grep -E '\.sh$' | while read -r file; do
  echo "formatting $file.."
  shfmt -i 2 -w "$file"
done
