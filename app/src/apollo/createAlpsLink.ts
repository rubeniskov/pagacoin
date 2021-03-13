import { ApolloLink, Resolvers } from '@apollo/client';
import { Observable } from '@apollo/client/utilities';
import { makeExecutableSchema } from '@graphql-tools/schema';
import pMinDelay from "p-min-delay";
// import { parseAndCheckHttpResponse } from '@apollo/client/link/http/parseAndCheckHttpResponse';
import { GraphQLSchema, DocumentNode, print, graphql } from 'graphql';

export interface AlpsOptions {
  uri?: string
  schema: string | GraphQLSchema | DocumentNode,
  resolvers: Resolvers,
  minDelay?: number,
}

export const createAlpsLink = (linkOptions: AlpsOptions) => {

  const { uri, schema, resolvers, minDelay = 600 } = linkOptions;
  
  if (!uri) throw new Error('uri must be defined for AlpsLink');

  let executableSchema: GraphQLSchema;
  if (typeof schema === 'string') {
    executableSchema = makeExecutableSchema({ 
      typeDefs: schema, 
      resolvers 
    });
  } else if (schema instanceof GraphQLSchema) {
    executableSchema = schema;
  } else if (schema.kind === 'Document') {
    executableSchema = makeExecutableSchema({
      typeDefs: print(schema),
      resolvers,
    });
  } else {
    throw new Error(
      'schema should be plain text, parsed schema or executable schema'
    );
  }

  return new ApolloLink(operation => {
    const context = operation.getContext();
    const { query, variables, operationName } = operation;

    return new Observable(observer => {

      graphql(
        executableSchema,
        print(query),
        undefined,
        {...context, uri},
        variables,
        operationName
      )
      .then((data) => pMinDelay(Promise.resolve(data), minDelay))
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => {
        console.error(err);
        observer.error(err);
      });
    });
  });
};


// export const createAlpsLink = () => {}
