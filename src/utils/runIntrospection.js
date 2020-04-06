import EdgeDBClient from 'service/EdgeDBClient';

export default async function runIntrospection(database) {
  const stdModules = [
    'std',
    'schema',
    'math',
    'sys',
    'cfg',
    'cal',
    'stdgraphql',
  ];

  const query = `WITH MODULE schema
SELECT ObjectType {
is_from_alias ,
    name,
    \`extending\` := to_str(array_agg(.ancestors.name), ', '),
    links: {
        name,
    },
    properties: {
        name,
    }
}
FILTER
      NOT .is_from_alias
  # AND NOT .is_compound_type // TODO enable with next version of EdgeDB
  AND NOT (re_test("^(${stdModules.join('|')})::", .name))
ORDER BY .name;`;

  return await EdgeDBClient.edgeql({ query, database });
}
