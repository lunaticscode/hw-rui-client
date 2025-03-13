import { AccordionControlledOptionalProps } from "../types";
import {
  AccordionRegionControlledOptionalProps,
  AccordionRegionControlledRequiredProps,
} from "../types/accordionRegion";
import {
  AccordionTriggerControlledOptionalProps,
  AccordionTriggerControlledRequiredProps,
} from "../types/accordionTrigger";

export const accordionDefaultProps: Required<AccordionControlledOptionalProps> =
  {
    onExpandedIds: () => {},
    disabled: false,
    defaultExpandedIds: [],
  };

export const accordionTriggerDefaultProps: Required<
  AccordionTriggerControlledOptionalProps &
    AccordionTriggerControlledRequiredProps
> = {
  id: "need-unique-id-for-trigger",
  disabled: false,
};

export const accordionRegionDefaultProps: Required<
  AccordionRegionControlledOptionalProps &
    AccordionRegionControlledRequiredProps
> = {
  id: "need-unique-id-for-region",
};
