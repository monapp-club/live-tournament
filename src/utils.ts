export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const isCurrentPath = (path: string) => {
  return path === window.location.pathname;
};

export const groupBy = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => string
) =>
  array.reduce((acc, value, index, array) => {
    (acc[predicate(value, index, array)] ||= []).push(value);
    return acc;
  }, {} as { [key: string]: T[] });
