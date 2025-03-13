import { FC, PropsWithChildren, useMemo } from "react";

type GuideTitleTags = "h2" | "h3";
interface GuideTitleProps extends PropsWithChildren {
  type?: GuideTitleTags;
}

const getTitleCls = (type: GuideTitleTags) => {
  const mapTypeToCls: { [key in GuideTitleTags]: string } = {
    h2: "app-guide-h2-title",
    h3: "app-guide-h3-title",
  };
  return mapTypeToCls[type];
};

const GuideTitle: FC<GuideTitleProps> = (props) => {
  const { type = "h2", children } = props;
  const [Tag, titleCls] = useMemo(() => [type, getTitleCls(type)], [type]);
  return <Tag className={titleCls}>{children}</Tag>;
};
export default GuideTitle;
