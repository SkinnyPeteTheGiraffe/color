#!/bin/bash

pnpm install --frozen-lockfile
pnpm run lint
pnpm run test
pnpm run build
