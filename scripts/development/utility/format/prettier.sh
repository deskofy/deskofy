#!/bin/bash

# Please run this script from the root of the project
# Check .prettierignore for ignored files
#
# https://prettier.io/

echo "formatting updated prettier-specific files.."

npx prettier . --write
