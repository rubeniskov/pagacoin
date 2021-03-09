import { ApolloLink } from '@apollo/client';
import { Observable } from '@apollo/client/utilities'
import { parseAndCheckHttpResponse } from '@apollo/client/link/http/parseAndCheckHttpResponse';

export interface AlpsOptions {
  uri?: string
}

export const createAlpsLink = (linkOptions: AlpsOptions = {}) => {
  return new ApolloLink(operation => {
    const context = operation.getContext();
    const uri = linkOptions.uri;
    
    if (!uri) throw new Error('uri must be defined for AlpsLink');
    console.log('yeah', operation);
    return new Observable(observer => {
      fetch(uri)
        .then(response => {
          operation.setContext({ response });
          console.log('response', response);
          return response;
        })
        // .then(parseAndCheckHttpResponse(operation))
        .then(() => {
          const result: any = {
            "data": {
              "rates": [
                {
                  "currency": "AAVE",
                  "rate": "0.0024615899655746646",
                  "__typename": "ExchangeRate"
                },
                {
                  "currency": "AED",
                  "rate": "3.6732",
                  "__typename": "ExchangeRate"
                }
              ]
            }
          };
          return result;
        })
        .then(result => {
          observer.next(result);
          observer.complete();
          return result;
        });
    });
  });
};
