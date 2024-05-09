import { useEffect, DependencyList } from "react";

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList,
) {
  useEffect(() => {
    const t = setTimeout(() => {
      // TODO: found in react-image-crop example, fix later
      // @ts-ignore
      fn.apply(undefined, deps);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}
