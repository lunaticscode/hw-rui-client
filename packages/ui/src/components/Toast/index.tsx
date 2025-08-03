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
import { getMergedInjectedClassName } from "@hw-rui/core/utils";

const TOASTER_ID = "hw-rui-toaster";

export const Toaster: FC = () => {
  return <div id={TOASTER_ID}></div>;
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
      classNames = { title: "", description: "", close: "" },
    } = args;
    cleanup();
    toasterRoot.current =
      createRoot(document.getElementById(TOASTER_ID)!) || null;
    if (!toasterRoot.current) {
      console.error(
        `Cannot make Root from id="${TOASTER_ID}". Check <Toaster /> is mounted.`
      );
      return;
    }

    const titleCls = getMergedInjectedClassName(
      toastTitleCls,
      classNames.title
    );
    const descriptionCls = getMergedInjectedClassName(
      toastDescriptionCls,
      classNames.description
    );
    const closeCls = getMergedInjectedClassName(
      toastCloseCls,
      classNames.close
    );

    toasterRoot.current.render(
      <div
        className={toastCls}
        data-type={type}
        style={{ ...getStyleByPosition(position), position: "fixed" }}
      >
        <ToastTitle className={titleCls}>{title}</ToastTitle>
        <ToastDescription className={descriptionCls}>
          {description}
        </ToastDescription>
        <ToastClose className={closeCls}>{closeElem}</ToastClose>
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
