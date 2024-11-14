
const formatDate = (ms) => {
  const date = new Date(ms);
  const [
    year,
    month,
    day,
  ] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];

  const smonth = `0${month}`.slice(-2);
  const sday = `0${day}`.slice(-2);

  return `${year}-${smonth}-${sday}`;
};
