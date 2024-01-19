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

test('multi-string: quote', () => {
  const strQuote = 'First line. \
  Second line.';
  assert.equal(
    strQuote,
    'First line.   Second line.',
  );

  const strQuoteNoIndentation = 'First line. \
Second line.';
  assert.equal(
    strQuoteNoIndentation,
    'First line. Second line.',
  );

  const strQuoteStyled = '\
First line. \
Second line.\
';
  assert.equal(
    strQuoteStyled,
    'First line. Second line.',
  );

  const strQuoteStyled2 = 
'First line. \
Second line.'
  ;
  assert.equal(
    strQuoteStyled2,
    'First line. Second line.',
  );

  //Result: quoted string with \ does not create line breaks.
  //It is good for splitting long strings in code for formatting.
  // indentation is preserved

  const strQuoteWithBreak = 
'First line. \n\
Second line.'
  ;
  assert.equal(
    strQuoteWithBreak,
    'First line. \nSecond line.',
  );
});

test('multi-string: template', () => {
  const strTemplate = `First line. 
  Second line.`;
  assert.equal(
    strTemplate,
    'First line. \n  Second line.',
  );

  const strTemplateNoIndentation = `First line.*
Second line.`;
  assert.equal(
    strTemplateNoIndentation,
    'First line.*\nSecond line.',
  );

  const strTemplateStyled = `
First line.*
Second line.
`;
  assert.equal(
    strTemplateStyled,
    '\nFirst line.*\nSecond line.\n',
  );

  const strTemplateStyled2 = 
`First line.*
Second line.`
  ;
  
  assert.equal(
    strTemplateStyled2,
    'First line.*\nSecond line.',
  );
  //Result: template string creates line breaks.
  // indentation is preserved
});
