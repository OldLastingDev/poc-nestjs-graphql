#! /bin/bash

pushd `dirname $0`

npx ts-node ./scripts/generate-typing.ts
npx prisma generate

popd