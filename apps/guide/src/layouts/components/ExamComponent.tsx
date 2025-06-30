import { FC, PropsWithChildren } from "react";

const examComponentCls = "app-guide-exam-component";
const ExamComponent: FC<PropsWithChildren> = ({ children }) => {
  return <div className={examComponentCls}>{children}</div>;
};
export default ExamComponent;
