#!/bin/sh

export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

yarn start -- -p "$PORT"