import { FC, useMemo } from "react";
import { AccordionTriggerProps } from "./types/accordionTrigger";
import { accordionTriggerDefaultProps } from "./consts/defaultProps";
import { useAccordionContext } from ".";

import {
  accordionTriggerCls,
  accordionTriggerButtonCls,
} from "@hw-rui/core/consts";
import { getMergedInjectedClassName } from "@hw-rui/core/utils";
const AccordionTrigger: FC<AccordionTriggerProps> = (props) => {
  const { expandedIds, handleChangeExpanded } = useAccordionContext();
  const { children, className, ...controlledProps } = props;
  const { id, disabled } = {
    ...accordionTriggerDefaultProps,
    ...controlledProps,
  };
  const isExpanded = useMemo(() => expandedIds.includes(id), [expandedIds, id]);

  const handleClickTriggerButton = () => {
    handleChangeExpanded(id, !isExpanded);
  };

  return (
    <h3 className={getMergedInjectedClassName(accordionTriggerCls, className)}>
      <button
        onClick={handleClickTriggerButton}
        className={getMergedInjectedClassName(
          accordionTriggerButtonCls,
          className
        )}
        type={"button"}
        id={`${id}-trigger`}
        aria-controls={`${id}-region`}
        data-expanded={isExpanded}
        aria-expanded={isExpanded}
        data-disabled={disabled}
        aria-disabled={disabled}
      >
        {children}
      </button>
    </h3>
  );
};
export default AccordionTrigger;
