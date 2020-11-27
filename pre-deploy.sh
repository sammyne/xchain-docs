#!/bin/bash

set -e

workingDir=${PWD}
vuepressDir=${PWD}/docs/.vuepress
app=xchain-docs

cd $vuepressDir
cp config.js hello.js
bash reconfigure.sh

cd ${workingDir}
yarn build

cd $vuepressDir
mv hello.js config.js

echo "pre-deploy @localhost:9090"

cd $workingDir

docker run --rm \
    -v ${PWD}/docs/.vuepress/dist:/usr/share/nginx/html/$app \
    --name html -p 9090:80 \
    nginx:1.19.5-alpine
