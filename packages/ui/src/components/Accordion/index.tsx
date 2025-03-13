import { FC, createContext, useMemo, useState } from "react";
import { AccordionContextProps, AccordionProps } from "./types";
import { accordionDefaultProps } from "./consts/defaultProps";
import { getMergedInjectedClassName } from "@repo/core/utils";
import { accordionCls } from "@repo/core/consts";
import AccordionTrigger from "./AccordionTrigger";
import AccordionRegion from "./AccordionRegion";
import { useUIContext } from "@repo/core/hooks";

type AccordionCompoundProps = {
  Trigger: typeof AccordionTrigger;
  Region: typeof AccordionRegion;
};

const AccordionContext = createContext<AccordionContextProps | null>(null);

export const useAccordionContext = () =>
  useUIContext(AccordionContext, "AccordionContext");

const Accordion: FC<AccordionProps> & AccordionCompoundProps = (props) => {
  const { children, className, ...controlledProps } = props;
  const { onExpandedIds, defaultExpandedIds, disabled, ...defaultProps } = {
    ...accordionDefaultProps,
    ...controlledProps,
  };

  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpandedIds);

  const handleChangeExpanded = (id: string, expanded: boolean) => {
    if (expanded) {
      setExpandedIds((prev) => [...prev, id]);
    } else {
      setExpandedIds((prev) => prev.filter((expandedId) => expandedId !== id));
    }
  };

  const contextValue: AccordionContextProps = useMemo(
    () => ({
      expandedIds,
      handleChangeExpanded,
    }),
    [expandedIds]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        {...defaultProps}
        className={getMergedInjectedClassName(accordionCls, className)}
        data-disabled={disabled}
        aria-disabled={disabled}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.Trigger = AccordionTrigger;
Accordion.Region = AccordionRegion;
Accordion.displayName = "Accordion";
export default Accordion;
