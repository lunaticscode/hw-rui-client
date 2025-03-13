import { FC } from "react";
import { ToastTitleProps } from "./types";

const ToastTitle: FC<ToastTitleProps> = (props) => {
  const { children, ...restProps } = props;
  return <div {...restProps}>{children}</div>;
};
export default ToastTitle;
