export function toLowerCaseAndRemoveSpaces(string) {
    return String(string)
      .toLowerCase()
      .replace(/ /g, "-");
}


export function groupBy(xs, key,processValue=(key)=>key) {
    return xs.reduce(function(rv, x) {
      (rv[processValue(x[key])] = rv[processValue(x[key])] || []).push(x);
      return rv;
    }, {});
};  

export function processTemp(temp){
  console.log('temp',temp);
  const gradosKelvin = 273.15
  return ( parseInt(temp) - gradosKelvin ).toFixed(0) 
}