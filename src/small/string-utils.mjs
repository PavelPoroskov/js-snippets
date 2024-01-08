// function fill template string with values
// example t('{userId}:config', { userId: 12 }) return '12:config'
export const fillTemplate = (strTemplate, objValues) => {
  const valuesWithCurls = Object.fromEntries(
    Object.entries(objValues)
      .map(([name, value]) => [
        `{${name}}`,
        value,
      ]),
  );
  const parts = strTemplate.split(/(\{[^}]+\})/g);

  return parts
    .map((part) => valuesWithCurls[part] || part)
    .join('');
};

