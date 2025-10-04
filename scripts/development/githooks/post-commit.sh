#!/bin/sh

COMMIT_HASH=$(git rev-parse --short HEAD)
echo "git hook: commit $COMMIT_HASH successfully made"
