#!/bin/sh

M=$(uname -a | awk '{print $1}')
base='"/xchain-docs/"'

if [[ "$M" == "Darwin" ]]; then
  sed -i '' "s!base: \".*\"!base: "$base"!" config.js
else 
  sed -i    "s!base: \".*\"!base: "$base"!" config.js
fi

