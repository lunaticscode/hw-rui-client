import { FC } from "react";
import { ToastCloseProps } from "./types";

const ToastClose: FC<ToastCloseProps> = (props) => {
  const { children, ...restProps } = props;
  return <div {...restProps}>{children ?? "close"}</div>;
};
export default ToastClose;
