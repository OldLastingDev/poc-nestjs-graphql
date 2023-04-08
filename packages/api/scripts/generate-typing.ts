/**
 * Fork from https://github.com/nestjs/nest/blob/master/sample/12-graphql-schema-first/generate-typings.ts
 */

import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const SRC_DIR = join(__dirname, '..', 'src');

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: [join(SRC_DIR, '**', '*.graphql')],
  path: join(SRC_DIR, 'graphql.autogen.ts'),
  outputAs: 'class',
});
