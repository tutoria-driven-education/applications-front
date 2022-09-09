export const debounceEvent = () => {
  let timer = null;
  return (fn, wait) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(), wait);
  };
};
