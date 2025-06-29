import ToastTitle from "./ToastTitle";
import ToastDescription from "./ToastDescription";
import ToastClose from "./ToastTitle";
import { ToastArgs, ToastPositions, ToastStyleFromPosition } from "./types";
import { FC, useEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
import {
  toastCloseCls,
  toastCls,
  toastDescriptionCls,
  toastTitleCls,
} from "@hw-rui/core/consts";

export const Toaster: FC = () => {
  return <div id={"ui-toaster"}></div>;
};
Toaster.displayName = "Toaster";

const getStyleByPosition = (pos: ToastPositions): ToastStyleFromPosition => {
  const mapPositionToStyle: { [key in typeof pos]: ToastStyleFromPosition } = {
    "bottom-left": {
      bottom: "0px",
      left: "0px",
    },
    "bottom-right": {
      bottom: "0px",
      right: "0px",
    },
    "top-left": {
      top: "0px",
      left: "0px",
    },
    "top-right": {
      top: "0px",
      right: "0px",
    },
  };

  return mapPositionToStyle[pos];
};

const useToast = () => {
  const toasterRoot = useRef<Root>(undefined);
  const timerId = useRef<NodeJS.Timeout>(undefined);

  const cleanup = () => {
    if (toasterRoot.current) {
      toasterRoot.current.unmount();
    }
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
  };

  const toast = (args: ToastArgs) => {
    const {
      title,
      description,
      position = "bottom-right",
      closeElem,
      duration = 2000,
      type = "default",
    } = args;
    cleanup();
    toasterRoot.current =
      createRoot(document.getElementById("ui-toaster")!) || null;
    if (!toasterRoot.current) {
      console.error(
        `Cannot make Root from id="ui-toaster". Check <Toaster /> is mounted.`
      );
      return;
    }

    toasterRoot.current.render(
      <div
        className={toastCls}
        data-type={type}
        style={{ ...getStyleByPosition(position), position: "fixed" }}
      >
        <ToastTitle className={toastTitleCls}>{title}</ToastTitle>
        <ToastDescription className={toastDescriptionCls}>
          {description}
        </ToastDescription>
        <ToastClose className={toastCloseCls}>{closeElem}</ToastClose>
      </div>
    );
    timerId.current = setTimeout(() => {
      cleanup();
    }, duration);
  };

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  return {
    toast,
  };
};
export default useToast;
