import { Ref, RefCallback, MutableRefObject } from "react";

export default function useMergedRef<T>(
  ...refs: (Ref<T> | undefined)[]
): RefCallback<T> {
  return (element: T) =>
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(element);
      else if (ref && typeof ref === "object")
        (ref as MutableRefObject<T>).current = element;
    });
}
