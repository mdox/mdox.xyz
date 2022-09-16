#!/usr/bin/bash -e

cd "$(dirname "$0")/.."

rm -rf .next
yarn build

./scripts/ship.sh
