#!/usr/bin/bash -e

cd "$(dirname "$0")/.."

DEPLOY_PATH=$(cat "./secret/deploy-path")

rsync -ciaAh --checksum --delete --progress \
  --filter="- node_modules" \
  . root@mdox.xyz:"$DEPLOY_PATH"
  