import uriTemplate from 'uri-template';
import flatten from 'lodash.flatten';
import omit from 'lodash.omit';

const parseUriTemplate = (
  tmpl = 'http://localhost:9966/{year}/{month}/{day}/search{?q,otherParams*}',
  vars: Record<string, any>,
) => {
  const parsedTmpl = uriTemplate.parse(tmpl);
  const urlVarNames = flatten(parsedTmpl.expressions.map(({ params }) => params.map(({ name }) => name)))
  const body = omit(vars, urlVarNames)
  return [ parsedTmpl.expand(vars), body ];
}

export default parseUriTemplate;
