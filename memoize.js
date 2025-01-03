function memoize(method) {
  let cache = {};
  
  return async function() {
      let args = JSON.stringify(arguments);
      cache[args] = cache[args] || method.apply(this, arguments);
      return cache[args];
  };
}


let getSoupRecipe = memoize(async function (soupType) {
  return await http.get(`/api/soup/${soupType}`);
});

let buySoupPan = memoize(async function () {
  return await http.get(`/api/soupPan`);
});

let hireSoupChef = memoize(async function (soupType) {
  let soupRecipe = await getSoupRecipe(soupType)

  return await http.post(`/api/soupChef/hire`, {
    requiredSkills: soupRecipe.requiredSkills
  });
});

let makeSoup = memoize(async function (soupType) {

  let [soupRecipe, soupPan, soupChef] = await Promise.all([
    getSoupRecipe(soupType), buySoupPan(), hireSoupChef(soupType)
  ]);

  return await http.post(`api/makeSoup`, {
    soupRecipe, soupPan, soupChef
  });
});
