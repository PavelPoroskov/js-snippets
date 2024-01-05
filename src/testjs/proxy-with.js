
const proxyHandlerFunctionCall = {
  apply: (fn, thisArg, argumentsList) => {
    console.log(`Proxy call: ${fn.name}`);

    try {
      return Reflect.apply(fn, thisArg, argumentsList);
    } catch (err) {
      console.log('catched ERR')
      console.log(err)
    }
  }
};

const proxyHandlerGet = {
  get: (target, property, receiver) => {
    console.log(`Proxy get: ${property}`);

    // return new Proxy(target[property], proxyHandlerFunctionCall)
    // console.log('1');
    // console.log(Reflect.get(arguments));
    // console.log(Reflect.get(...arguments));
    // console.log(target[property]);
    // console.log(arguments);
    // console.log(Reflect.get(target, property, receiver));

    return new Proxy(Reflect.get(target, property, receiver), proxyHandlerFunctionCall)
  },
};

const createClient = (companyId) => {

  const interface = {
    post: (arg) => {
      throw { message: 'ugly  error' };
      console.log(`post ${companyId}/${arg}`);
    },
  };

  // return interface;

  return new Proxy(interface, proxyHandlerGet);
};

module.exports = {
  createClient,
}
