import assert from 'node:assert/strict';
import test from 'node:test';

import { makeInitOnFirstUseProxy } from './makeInitOnFirstUseProxy.mjs';

const wait = (ms) => new Promise((fnResolve) => {
  setTimeout(fnResolve, ms);
});

test('makeInitOnFirstUseProxy: main scenario: service.method(), service.quit()', async () => {
  const calls = [];
  const makeService = () => {
    let data;

    const service = {
      setData: async (inData) => {
        calls.push({ method: 'service.setData', arguments: inData });
        await wait(5);
        data = inData;
      },
      getData: async () => {
        calls.push({ method: 'service.getData' });
        await wait(5);
        return data;
      },
      exit: async () => {
        calls.push({ method: 'service.exit' });
        await wait(5);
      },
    };

    return service;
  };

  const proxiedService = makeInitOnFirstUseProxy({
    init: async () => {
      calls.push({ method: 'proxy.init' });

      const service = await makeService();
      return service;
    },
    quit: async (service) => {
      calls.push({ method: 'proxy.quit' });

      await service.exit();
    },
  });

  const testData = {
    a: 11,
    b: 'MIT',
  };
  await proxiedService.setData(testData);
  const restoredData = await proxiedService.getData();
  assert.deepEqual(
    testData,
    restoredData,
  );

  await proxiedService.quit();

  assert.deepEqual(
    calls,
    [
      { method: 'proxy.init' },
      {
        method: 'service.setData',
        arguments: {
          a: 11,
          b: 'MIT',
        },
      },
      { method: 'service.getData' },
      { method: 'proxy.quit' },
      { method: 'service.exit' },
    ],
  );
});

test('makeInitOnFirstUseProxy: service.quit() without service.method()', async () => {
  const calls = [];
  const makeService = () => {
    let data;

    const service = {
      setData: async (inData) => {
        calls.push({ method: 'service.setData', arguments: inData });
        await wait(5);
        data = inData;
      },
      getData: async () => {
        calls.push({ method: 'service.getData' });
        await wait(5);
        return data;
      },
      exit: async () => {
        calls.push({ method: 'service.exit' });
        await wait(5);
      },
    };

    return service;
  };

  const proxiedService = makeInitOnFirstUseProxy({
    init: async () => {
      calls.push({ method: 'proxy.init' });

      const service = await makeService();
      return service;
    },
    quit: async (service) => {
      calls.push({ method: 'proxy.quit' });
      await service.exit();
    },
  });

  await proxiedService.quit();

  assert.deepEqual(
    calls,
    [],
  );
});

test('makeInitOnFirstUseProxy: service.method(), service.quit(), service.method()', async () => {
  const calls = [];
  const makeService = () => {
    let data;

    const service = {
      setData: async (inData) => {
        calls.push({ method: 'service.setData', arguments: inData });
        await wait(5);
        data = inData;
      },
      getData: async () => {
        calls.push({ method: 'service.getData' });
        await wait(5);
        return data;
      },
      exit: async () => {
        calls.push({ method: 'service.exit' });
        await wait(5);
      },
    };

    return service;
  };

  const proxiedService = makeInitOnFirstUseProxy({
    init: async () => {
      calls.push({ method: 'proxy.init' });

      const service = await makeService();
      return service;
    },
    quit: async (service) => {
      calls.push({ method: 'proxy.quit' });
      await service.exit();
    },
    serviceName: 'TestService',
  });

  await proxiedService.setData(11);
  await proxiedService.quit();

  await assert.rejects(
    async () => {
      await proxiedService.setData(22);
    },
    { message: 'Service \'TestService\' is used after termination' },
  );
});

test('makeInitOnFirstUseProxy: finally after error on creating service', async () => {
  const calls = [];
  const makeService = () => {
    throw new Error('InitServiceError');
  };

  let proxiedService;
  let caughtError;
  let isFinallyDoneSuccess = false;

  try {
    proxiedService = makeInitOnFirstUseProxy({
      init: async () => {
        calls.push({ method: 'proxy.init' });

        const service = await makeService();
        return service;
      },
      quit: async (service) => {
        calls.push({ method: 'proxy.quit' });
        await service.exit();
      },
      serviceName: 'TestService',
    });

    await proxiedService.setData(11);
  } catch (UseServiceError) {
    caughtError = UseServiceError;
  } finally {
    await proxiedService.quit();
    isFinallyDoneSuccess = true;
  }

  assert.ok(caughtError);
  assert.equal(caughtError.message, 'InitServiceError');
  assert.equal(isFinallyDoneSuccess, true);
});

test('makeInitOnFirstUseProxy: service.methodWithError(), service.method()', async () => {
  const calls = [];
  const makeService = () => {
    const service = {
      methodWithError: async () => {
        calls.push({ method: 'service.methodWithError' });
        throw new Error('methodWithErrorError');
      },
      method: async () => {
        calls.push({ method: 'service.method' });
        await wait(5);
      },
      exit: async () => {
        calls.push({ method: 'service.exit' });
        await wait(5);
      },
    };

    return service;
  };

  let proxiedService;
  let caughtError;
  let isFinallyDoneSuccess = false;

  try {
    try {
      proxiedService = makeInitOnFirstUseProxy({
        init: async () => {
          calls.push({ method: 'proxy.init' });

          const service = await makeService();
          return service;
        },
        quit: async (service) => {
          calls.push({ method: 'proxy.quit' });
          await service.exit();
        },
        serviceName: 'TestService',
      });

      await proxiedService.methodWithError();
    } catch (UseServiceError) {
      caughtError = UseServiceError;
    }

    await proxiedService.method();
  } finally {
    await proxiedService.quit();
    isFinallyDoneSuccess = true;
  }

  assert.ok(caughtError);
  assert.equal(caughtError.message, 'methodWithErrorError');
  assert.equal(isFinallyDoneSuccess, true);
  assert.deepEqual(
    calls,
    [
      { method: 'proxy.init' },
      { method: 'service.methodWithError' },
      { method: 'service.method' },
      { method: 'proxy.quit' },
      { method: 'service.exit' },
    ],
  );
});

test('makeInitOnFirstUseProxy: service.method(), service.methodWithError()', async () => {
  const calls = [];
  const makeService = () => {
    const service = {
      methodWithError: async () => {
        calls.push({ method: 'service.methodWithError' });
        throw new Error('methodWithErrorError');
      },
      method: async () => {
        calls.push({ method: 'service.method' });
        await wait(5);
      },
      exit: async () => {
        calls.push({ method: 'service.exit' });
        await wait(5);
      },
    };

    return service;
  };

  let proxiedService;
  let caughtError;
  let isFinallyDoneSuccess = false;

  try {
    proxiedService = makeInitOnFirstUseProxy({
      init: async () => {
        calls.push({ method: 'proxy.init' });

        const service = await makeService();
        return service;
      },
      quit: async (service) => {
        calls.push({ method: 'proxy.quit' });
        await service.exit();
      },
      serviceName: 'TestService',
    });

    await proxiedService.method();
    await proxiedService.methodWithError();
  } catch (UseServiceError) {
    caughtError = UseServiceError;
  } finally {
    await proxiedService.quit();
    isFinallyDoneSuccess = true;
  }

  assert.ok(caughtError);
  assert.equal(caughtError.message, 'methodWithErrorError');
  assert.equal(isFinallyDoneSuccess, true);
  assert.deepEqual(
    calls,
    [
      { method: 'proxy.init' },
      { method: 'service.method' },
      { method: 'service.methodWithError' },
      { method: 'proxy.quit' },
      { method: 'service.exit' },
    ],
  );
});

test('makeInitOnFirstUseProxy: service.notExistMethod(), service.method()', async () => {
  const calls = [];
  const makeService = () => {
    const service = {
      method: async () => {
        calls.push({ method: 'service.method' });
        await wait(5);
      },
      exit: async () => {
        calls.push({ method: 'service.exit' });
        await wait(5);
      },
    };

    return service;
  };

  let proxiedService;
  let caughtError;
  let isFinallyDoneSuccess = false;

  try {
    proxiedService = makeInitOnFirstUseProxy({
      init: async () => {
        calls.push({ method: 'proxy.init' });

        const service = await makeService();
        return service;
      },
      quit: async (service) => {
        calls.push({ method: 'proxy.quit' });
        await service.exit();
      },
      serviceName: 'TestService',
    });

    try {
      await proxiedService.notExistMethod();
    } catch (UseServiceError) {
      caughtError = UseServiceError;
    }
    await proxiedService.method();
  } finally {
    await proxiedService.quit();
    isFinallyDoneSuccess = true;
  }

  assert.ok(caughtError);
  assert.equal(caughtError.message, 'Service \'TestService\' does not have property/method notExistMethod');
  assert.equal(isFinallyDoneSuccess, true);
  assert.deepEqual(
    calls,
    [
      { method: 'proxy.init' },
      { method: 'service.method' },
      { method: 'proxy.quit' },
      { method: 'service.exit' },
    ],
  );
});

test('makeInitOnFirstUseProxy: service.method(), service.notExistMethod()', async () => {
  const calls = [];
  const makeService = () => {
    const service = {
      method: async () => {
        calls.push({ method: 'service.method' });
        await wait(5);
      },
      exit: async () => {
        calls.push({ method: 'service.exit' });
        await wait(5);
      },
    };

    return service;
  };

  let proxiedService;
  let caughtError;
  let isFinallyDoneSuccess = false;

  try {
    proxiedService = makeInitOnFirstUseProxy({
      init: async () => {
        calls.push({ method: 'proxy.init' });

        const service = await makeService();
        return service;
      },
      quit: async (service) => {
        calls.push({ method: 'proxy.quit' });
        await service.exit();
      },
      serviceName: 'TestService',
    });

    await proxiedService.method();
    await proxiedService.notExistMethod();
  } catch (UseServiceError) {
    caughtError = UseServiceError;
  } finally {
    await proxiedService.quit();
    isFinallyDoneSuccess = true;
  }

  assert.ok(caughtError);
  assert.equal(caughtError.message, 'Service \'TestService\' does not have property/method notExistMethod');
  assert.equal(isFinallyDoneSuccess, true);
  assert.deepEqual(
    calls,
    [
      { method: 'proxy.init' },
      { method: 'service.method' },
      { method: 'proxy.quit' },
      { method: 'service.exit' },
    ],
  );
});
