#! /bin/bash

pushd `dirname $0`

npx ts-node ./generate-typing.ts

popd