import { FC } from "react";
import { ToastDescriptionProps } from "./types";

const ToastDescription: FC<ToastDescriptionProps> = (props) => {
  const { children, ...restProps } = props;
  return <div {...restProps}>{children ?? "Description"}</div>;
};
export default ToastDescription;
