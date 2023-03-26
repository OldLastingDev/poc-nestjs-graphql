/**
 * Fork from https://github.com/nestjs/nest/blob/master/sample/12-graphql-schema-first/generate-typings.ts
 */

import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.autogen.ts'),
  outputAs: 'class',
});
