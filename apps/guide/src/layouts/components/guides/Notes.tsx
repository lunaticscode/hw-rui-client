import GuideDivider from "@layouts/components/GuideDivider";
import GuideTitle from "@layouts/components/GuideTitle";
import { FC, PropsWithChildren } from "react";
interface NotesProps extends PropsWithChildren {}
const Notes: FC<NotesProps> = ({ children }) => {
  return (
    <>
      <GuideDivider />
      <GuideTitle>Notes</GuideTitle>
      {children}
    </>
  );
};
export default Notes;
