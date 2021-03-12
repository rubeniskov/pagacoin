
interface resolveDataOpts {
  dataKey: string,
  mapResult: Function
} 

const unwindResolvedData = (result: Record<string, any>, opts: resolveDataOpts) => {
  const { dataKey, mapResult } = opts || {};
  if (dataKey) {
    if (Object.prototype.hasOwnProperty.call(result, dataKey)) {
      result = result[dataKey];
      // throw new Error(`Failed to instrospect dataKey: ${dataKey} on result; missing data`)
    }
  }
  
  if (typeof mapResult === 'function') {
    result = mapResult(result);
  }

  return result
}

export default unwindResolvedData;
