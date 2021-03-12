
const getOptsFromContext = (ctx) => {
  const { dataKey = '_embedded', uri } = ctx;

  return { uri, dataKey };
}

export default getOptsFromContext;
