import {
  prefixCls,
  accordion,
  button,
  calendar,
  popover,
  select,
  tabs,
  toast,
} from "./cls.json";

/**== Accordion ==**/
export const accordionCls = `${prefixCls}-${accordion.base}`;
export const accordionTriggerCls = `${prefixCls}-${accordion.trigger}`;
export const accordionTriggerButtonCls = `${prefixCls}-${accordion.triggerButton}`;
export const accordionRegionCls = `${prefixCls}-${accordion.region}`;

/**== Button ==**/
export const buttonCls = `${prefixCls}-${button.base}`;
export const buttonIconCls = `${prefixCls}-${button.icon}`;

/**== Calendar ==**/
export const calendarCls = `${prefixCls}-${calendar.base}`;
export const calendarCurrentCls = `${prefixCls}-${calendar.current}`;
export const calendarTodayButtonCls = `${prefixCls}-${calendar.todayButton}`;

/**== Popover ==**/
export const popoverCls = `${prefixCls}-${popover.base}`;
export const popoverTriggerCls = `${prefixCls}-${popover.trigger}`;
export const popoverTriggerButtonCls = `${prefixCls}-${popover.triggerButton}`;
export const popoverContentCls = `${prefixCls}-${popover.content}`;

/**== Select ==**/
export const selectCls = `${prefixCls}-${select.base}`;
export const selectTriggerCls = `${prefixCls}-${select.trigger}`;
export const selectSelectedValueCls = `${prefixCls}-${select.selectedValue}`;
export const selectContentCls = `${prefixCls}-${select.content}`;
export const selectItemCls = `${prefixCls}-${select.item}`;

/**== Tabs ==**/
export const tabsCls = `${prefixCls}-${tabs.base}`;

/**== Toast ==**/
export const toastCls = `${prefixCls}-${toast.base}`;
export const toastToasterCls = `${prefixCls}-${toast.toaster}`;
export const toastTitleCls = `${prefixCls}-${toast.toastTitle}`;
export const toastDescriptionCls = `${prefixCls}-${toast.toastDescription}`;
export const toastCloseCls = `${prefixCls}-${toast.toastClose}`;
