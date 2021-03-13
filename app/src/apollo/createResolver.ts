import parseUriTemplate from './utils/parseUriTemplate';
import unwindResolvedData, { ResolveDataOpts } from './utils/unwindResolvedData';
import getOptsFromContext from './utils/getOptsFromContext';

interface ResolverOptions extends RequestInit, ResolveDataOpts {
  mapResult?: Function,
}

const NON_BODY_METHODS = ['HEAD', ' GET'];

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
}

const createResolver = (path: string, opts?: ResolverOptions) => (root, args, ctx) => {
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
    
    if (response.status >= 400) {
      return response.json().then(({ message }) =>{
        return Promise.reject(new Error(message));
      });
    }
    
    return response.json().then((result) => {
      return unwindResolvedData(result, restOpts)
    });
  });
}

export default createResolver;
