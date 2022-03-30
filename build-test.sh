#!/bin/bash

npm install --frozen-lockfile
npm run lint
npm run test
npm run build
