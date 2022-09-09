export const getFirstDayOfTheMonth = () => {
  const date = new Date();
  const newDate = new Date(date.getFullYear(), date.getMonth(), 1);
  return {
    day: newDate.getDate(),
    month: newDate.getMonth() + 1,
    year: newDate.getFullYear(),
  };
};
