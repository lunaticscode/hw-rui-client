import { FC, PropsWithChildren, useId, useMemo } from "react";

type GuideTitleTags = "h2" | "h3" | "h4";
interface GuideTitleProps extends PropsWithChildren {
  type?: GuideTitleTags;
}

const getTitleCls = (type: GuideTitleTags) => {
  const mapTypeToCls: { [key in GuideTitleTags]: string } = {
    h2: "app-guide-h2-title",
    h3: "app-guide-h3-title",
    h4: "app-guide-h4-title",
  };
  return mapTypeToCls[type];
};

const GuideTitle: FC<GuideTitleProps> = (props) => {
  const { type = "h2", children } = props;
  const [Tag, titleCls] = useMemo(() => [type, getTitleCls(type)], [type]);
  const guideRandomId = useId();
  const sectionId =
    typeof children === "string" ? children.toLocaleLowerCase() : guideRandomId;
  return type === "h2" ? (
    <section id={sectionId}>
      <Tag
        style={{ cursor: "pointer" }}
        onClick={() => (window.location.href = `#${sectionId}`)}
        className={titleCls}
      >
        {children}
      </Tag>
    </section>
  ) : (
    <Tag className={titleCls}>{children}</Tag>
  );
};
export default GuideTitle;
