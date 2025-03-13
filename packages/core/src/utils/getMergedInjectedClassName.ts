const getMergedInjectedClassName = (
  componentCls: string,
  injectedCls?: string
) => {
  if (!injectedCls) return componentCls;
  return `${injectedCls} ${componentCls}`;
};
export default getMergedInjectedClassName;
