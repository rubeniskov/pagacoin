import parseUriTemplate from './utils/parseUriTemplate';
import unwindResolvedData from './utils/unwindResolvedData';
import getOptsFromContext from './utils/getOptsFromContext';

interface ResolverOptions extends RequestInit {
  mapResult: Function,
}

const NON_BODY_METHODS = ['HEAD', ' GET'];

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
}

const createResolver = (path: string, opts: ResolverOptions) => (root, args, ctx) => {
  const { uri: baseUri, ...restOpts } = { ...opts, ...getOptsFromContext(ctx) };

  const vars = { ...root, ...args };
  const tmpl = baseUri + path;
  const [url, params] = parseUriTemplate(tmpl, vars);

  const hasBodyParams = !!Object.keys(params).length;

  const fetchOpts = { 
    headers: DEFAULT_HEADERS,
    ...opts 
  };

  const { method } = fetchOpts;
  console.log(root, args);
  if (hasBodyParams) {
    if (!method || (['HEAD', ' GET'].includes(method))) {
      throw new Error(`Request with ${NON_BODY_METHODS.join('/')} method cannot have body`);
    }

    fetchOpts.body = JSON.stringify(params) ;
  }
  
  return fetch(url, fetchOpts).then(response => {
    if (response.status === 204) {
      return [];
    }
    return response.json().then((result) => {
      return unwindResolvedData(result, restOpts)
    });
  });
}

export default {
  Query: {
    wallet: createResolver('/wallets/{walletId}', {
      mapResult: (result) => result
    }),
    wallets: createResolver('/wallets{?userId}', {
      mapResult: (result) => result.wallets
    }),
    user: createResolver('/users/{userId}', {
      mapResult: (result) => result
    }),
    users: createResolver('/users{?query}', {
      mapResult: (result) => result.users
    }),
    transactions: createResolver('/transactions', {
      mapResult: (result) => result.transactions
    }),
  },

  Mutation: {
    createUser: async (root, args, ctx) => {
      console.log(root, args, ctx);
      const { uri } = ctx;
      const result = await fetch(`${uri}/users`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        // redirect: 'follow',
        // referrerPolicy: 'no-referrer',
        body: JSON.stringify(args) 
      }).then((response) => response.json());
      console.log(result);
      return result;
    },
    chargeWalletMoney: createResolver('/wallets/{walletId}/charge', {
      mapResult: (result) => result,
      method: 'POST'
    }),
    transferWalletMoney: createResolver('/wallets/{walletId}/transfer', {
      mapResult: (result) => result,
      method: 'POST'
    })
  },

  // Post: {
  //   author: rest.getUser,
  // },

  // User: {
  //   posts: rest.getPosts,
  // },
};
