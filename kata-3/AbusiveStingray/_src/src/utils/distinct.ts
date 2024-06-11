/**
 * Use a setter which only sets on distinct values.
 * @param setter Real setter
 * @param initial Initial value
 * @returns Memorizing setter
 */
export const useSetDistinct = <T>(setter: (val: T) => void, initial?: T) => {
  let value: T | undefined = initial;
  return (val: T) => {
    if (value === val) return;
    value = val;
    setter.call(this, value);
  };
};
