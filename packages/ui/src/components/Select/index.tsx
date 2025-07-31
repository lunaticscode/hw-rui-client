import {
  createContext,
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  useImperativeHandle,
  useMemo,
  useRef,
  // useState,
} from "react";
import { SelectContextProps, SelectProps, SelectValue } from "./types";
import SelectTrigger from "./SelectTrigger";
import SelectSelectedValue from "./SelectSelectedValue";
import SelectContent from "./SelectContent";
import SelectItem from "./SelectItem";
import { getMergedInjectedClassName } from "@hw-rui/core/utils";
import { selectCls } from "@hw-rui/core/consts";
import Popover, { PopoverRefProps } from "../Popover";
import { useUIContext, useControlledValue } from "@hw-rui/core/hooks";

const SelectContext = createContext<SelectContextProps | null>(null);
export const useSelectContext = () =>
  useUIContext(SelectContext, "SelectContext");
interface SelectCompoundProps
  extends ForwardRefExoticComponent<SelectProps & RefAttributes<HTMLElement>> {
  Trigger: typeof SelectTrigger;
  SelectedValue: typeof SelectSelectedValue;
  Content: typeof SelectContent;
  Item: typeof SelectItem;
}

interface SelectRefProps {
  close: () => void;
  open: () => void;
  getSelectedValue: (value: string) => void;
}

const SelectForwardRef = forwardRef<SelectRefProps, SelectProps>(
  (props, ref) => {
    const { className, children, ...controlledProps } = props;
    const {
      value: valueProp,
      defaultValue: defaultValueProp,
      onChange,
    } = {
      ...controlledProps,
    };
    // const [internalLabel, setInternalLabel] = useState<ReactNode>();
    const { value = "", setValue } = useControlledValue(
      valueProp,
      defaultValueProp
    );
    const popoverRef = useRef(null);

    const handleChangeSelectedValue = (
      newValue: SelectValue,
      _label: ReactNode
    ) => {
      if (popoverRef.current) {
        const { close } = popoverRef.current as PopoverRefProps;

        close();
      }
      if (newValue === value) return;
      setValue(newValue);
      onChange?.(newValue);
    };

    const closeByTrigger = () => {
      if (!popoverRef.current) return;
      (popoverRef.current as PopoverRefProps).close();
    };
    const openByTrigger = () => {
      // if (!popoverRef.current) return;
      // (popoverRef.current as PopoverRefProps).();
    };
    const getSelectedValueByTrigger = () => {};

    useImperativeHandle(ref, () => ({
      close: closeByTrigger,
      open: openByTrigger,
      getSelectedValue: getSelectedValueByTrigger,
    }));

    const selectContextValue: SelectContextProps = useMemo(
      () => ({
        selectedValue: value,
        handleChangeSelectedValue,
      }),
      [value]
    );

    return (
      <div className={getMergedInjectedClassName(selectCls, className)}>
        <SelectContext.Provider value={selectContextValue}>
          <Popover ref={popoverRef}>{children}</Popover>
        </SelectContext.Provider>
      </div>
    );
  }
);

const Select = {
  ...SelectForwardRef,
  Trigger: SelectTrigger,
  SelectedValue: SelectSelectedValue,
  Content: SelectContent,
  Item: SelectItem,
} as SelectCompoundProps;
export default Select;
Select.displayName = "Select";
