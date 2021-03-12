import { ApolloLink, Resolvers } from '@apollo/client';
import { Observable } from '@apollo/client/utilities';
import { makeExecutableSchema } from '@graphql-tools/schema';
// import { parseAndCheckHttpResponse } from '@apollo/client/link/http/parseAndCheckHttpResponse';
import { GraphQLSchema, DocumentNode, print, graphql } from 'graphql';

export interface AlpsOptions {
  uri?: string
  schema: string | GraphQLSchema | DocumentNode,
  resolvers: Resolvers
}

export const createAlpsLink = (linkOptions: AlpsOptions) => {

  const { uri, schema, resolvers } = linkOptions;
  
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
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => {
        console.error(err);
        observer.error(err);
      });

      // fetch(`${uri}/transactions`)
      //   .then(response => {
      //     operation.setContext({ response });
      //     console.log('response', response);
      //     return response.json();
      //   })
      //   // .then(parseAndCheckHttpResponse(operation))
      //   .then((data) => {
      //     console.log('data', data);
      //     const result: any = {
      //       "data": { transactions: data._embedded.transactions.map(({ amount, ...rest }) => ({
      //         ...rest,
      //         amount, __typename: "Transasction" 
      //       })) }
      //       /*{
      //         "rates": [
      //           {
      //             "currency": "AAVE",
      //             "rate": "0.0024615899655746646",
      //             "__typename": "ExchangeRate"
      //           },
      //           {
      //             "currency": "AED",
      //             "rate": "3.6732",
      //             "__typename": "ExchangeRate"
      //           }
      //         ]
      //       }*/
      //     };

      //     console.log(result);
      //     return result;
      //   })
      //   .then(result => {
      //     observer.next(result);
      //     observer.complete();
      //     return result;
      //   });
    });
  });
};


// export const createAlpsLink = () => {}
