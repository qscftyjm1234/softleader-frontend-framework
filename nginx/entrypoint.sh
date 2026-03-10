#!/bin/sh
# entrypoint.sh - 用於處理環境變數並啟動 Nginx

set -e

# 將 nginx.default.conf.template 中的環境變數替換為實際值，並產生最終的 nginx.conf
envsubst '${BACKEND_URL_API} ${NAME_SPACE} ${RUNTIME_ENV}' < /tmp/nginx.default.conf.template > /tmp/nginx.default.conf

echo "Starting Nginx..."
exec nginx -g "daemon off;"
