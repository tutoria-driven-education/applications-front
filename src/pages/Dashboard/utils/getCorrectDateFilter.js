export const getCorrectDateFilter = (date) => {
  const day = `${
    Number.parseInt(date.day) > 9
      ? Number.parseInt(date.day)
      : `0${Number.parseInt(date.day)}`
  }`;
  const month = `${
    Number.parseInt(date.month) > 9
      ? Number.parseInt(date.month)
      : `0${Number.parseInt(date.month)}`
  }`;
  const year = date.year;
  return `${day}/${month}/${year}`;
};
