import assert from 'node:assert/strict';
import test from 'node:test';

import { fillTemplate } from './string-utils.mjs';

test('fillTemplate()', () => {
  const result = fillTemplate(
    '{companyId}/config/main.json',
    { companyId: 1222 },
  );
  assert.equal(
    result,
    '1222/config/main.json',
  );
});

