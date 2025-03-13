import { FC, useMemo } from "react";
import { AccordionRegionProps } from "./types/accordionRegion";
import { accordionRegionDefaultProps } from "./consts/defaultProps";
import { useAccordionContext } from ".";

import { accordionRegionCls } from "@repo/core/consts";
import { getMergedInjectedClassName } from "@repo/core/utils";
const AccordionRegion: FC<AccordionRegionProps> = (props) => {
  const { expandedIds } = useAccordionContext();
  const { className, children, ...controlledProps } = props;
  const { id } = { ...accordionRegionDefaultProps, ...controlledProps };
  const isExpanded = useMemo(() => expandedIds.includes(id), [id, expandedIds]);
  return isExpanded ? (
    <div
      className={getMergedInjectedClassName(accordionRegionCls, className)}
      id={`${id}-region`}
      aria-labelledby={`${id}-trigger`}
      role={"region"}
      data-expanded={isExpanded}
      aria-expanded={isExpanded}
    >
      {children}
    </div>
  ) : null;
};
export default AccordionRegion;
