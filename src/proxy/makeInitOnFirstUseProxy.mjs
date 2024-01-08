const SERVICE_STATE = {
  UNINITIALIZED: 'UNINITIALIZED',
  INITIALIZED: 'INITIALIZED',
  TERMINATED: 'TERMINATED',
};

// Assumption All method of service are asynchronous.
// Assumption We do not use service.property. We use only service.method().
export const makeInitOnFirstUseProxy = ({
  // This method is called on first use;
  //
  // example redis 4.0
  // init: async () => {
  //   // import { createClient } from 'redis'
  //   const redisClient = createClient({
  //     host: process.env.REDIS_HOST,
  //     port: process.env.REDIS_PORT,
  //     db: process.env.REDIS_DATABASE,
  //   });
  //   await redisClient.connect();
  //   return redisClient;
  // }
  init,

  // example redis 4.0
  // quit: async (redisClient) => {
  //  await redisClient.quit()
  // }
  quit,
  serviceName = 'default initOnFirstUseProxy(service)',
  quitMethodNameList = ['quit', 'destroy', 'exit'],
}) => {
  let service;
  let serviceState = SERVICE_STATE.UNINITIALIZED;

  return new Proxy({}, {
    get: (target, methodName, receiver) => {
      switch (serviceState) {
        case SERVICE_STATE.UNINITIALIZED:
          if (methodName === 'quit' || quitMethodNameList.includes(methodName)) {
            return () => true;
          }

          return (...allArguments) => init()
            .then((initializedService) => {
              service = initializedService;
              serviceState = SERVICE_STATE.INITIALIZED;

              const resultMember = Reflect.get(service, methodName, receiver);

              if (!resultMember) {
                throw new Error(
                  `Service '${serviceName}' does not have property/method ${methodName}`,
                );
              }

              return service[methodName](...allArguments);
            });
        case SERVICE_STATE.INITIALIZED: {
          if (methodName === 'quit') {
            serviceState = SERVICE_STATE.TERMINATED;

            return () => quit(service);
          }

          const resultMember = Reflect.get(service, methodName, receiver);

          if (!resultMember) {
            throw new Error(`Service '${serviceName}' does not have property/method ${methodName}`);
          }

          return (...allArguments) => service[methodName](...allArguments);
        }
        case SERVICE_STATE.TERMINATED:
        default:
          throw new Error(`Service '${serviceName}' is used after termination`);
      }
    },
  });
};
