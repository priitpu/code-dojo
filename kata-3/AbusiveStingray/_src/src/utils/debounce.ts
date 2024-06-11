export type InnerFunction = (...args: any[]) => any;
export const debounce = <T extends InnerFunction>(func: T, timeout = 300) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
