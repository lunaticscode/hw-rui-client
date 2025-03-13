import { Context, useContext } from "react";

const useUIContext = <T>(ctx: Context<T>, ctxLabel?: string) => {
  const context = useContext(ctx);
  if (!context) {
    throw Error(
      `${ctxLabel ?? "This UI Context"} cannot access in this scope.`
    );
  }
  return context;
};
export default useUIContext;
