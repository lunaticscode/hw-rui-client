import CodeBlock from "@layouts/components/CodeBlock";
import ExamComponent from "@layouts/components/ExamComponent";
import GuideDivider from "@layouts/components/GuideDivider";
import { Install, Intro, Usage } from "@layouts/components/guides";
import GuideTitle from "@layouts/components/GuideTitle";
import useTranslator from "@layouts/hooks/useTranslator";
import Button from "@repo/ui/Button";
import Carousel from "@repo/ui/Carousel";
import { setProcessedMarkdownString } from "@utils/markdown";
import { useEffect, useState } from "react";

const CarouselGuide = () => {
  const { Trans } = useTranslator();
  const [basicExampleCode, setBasicExampleCode] = useState("");
  const [multiItemExampleCode, setMultiItemExampleCode] = useState("");
  const [customNavigatorCode, setCustomNavigatorCode] = useState("");
  const [installCode, setInstallCode] = useState("");
  const setUsageCodes = () => {
    import("./markdowns/Usage_BasicExample.md")
      .then((res) => {
        return res.default;
      })
      .then((res) => {
        setBasicExampleCode(setProcessedMarkdownString(res));
      });
    import("./markdowns/Usage_MultiItemExample.md")
      .then((res) => {
        return res.default;
      })
      .then((res) => {
        setMultiItemExampleCode(setProcessedMarkdownString(res));
      });
    import("./markdowns/Usage_CustomNavigator.md")
      .then((res) => {
        return res.default;
      })
      .then((res) => {
        setCustomNavigatorCode(setProcessedMarkdownString(res));
      });
  };
  const setInstallCodes = () => {
    import("./markdowns/Install_Code.md")
      .then((res) => res.default)
      .then((res) => setInstallCode(res));
  };
  useEffect(() => {
    setUsageCodes();
    setInstallCodes();
  }, []);
  return (
    <>
      <Intro title={"Carousel"}>
        <Trans langKey="carousel-intro" />
      </Intro>
      <Install>
        <CodeBlock code={installCode} />
      </Install>
      <Usage>
        <GuideTitle type="h3">Basic</GuideTitle>
        <ExamComponent>
          <div>
            <Carousel>
              <Carousel.Holder>
                <Carousel.Item value={"a"}>Item-A</Carousel.Item>
                <Carousel.Item value={"b"}>Item-B</Carousel.Item>
                <Carousel.Item value={"c"}>Item-C</Carousel.Item>
              </Carousel.Holder>
              <Carousel.Navigator />
            </Carousel>
          </div>
        </ExamComponent>
        <CodeBlock code={basicExampleCode} />
        <GuideDivider />
        <GuideTitle type="h3">Multi Item</GuideTitle>
        <ExamComponent>
          <div>
            <Carousel itemsPerView={3}>
              <Carousel.Holder>
                {Array.from({ length: 10 }, (_, index) => (
                  <Carousel.Item
                    key={`carouse-item-key-${index}`}
                    value={`item-${index}`}
                  >{`carousel-item-${index}`}</Carousel.Item>
                ))}
              </Carousel.Holder>
              <Carousel.Navigator />
            </Carousel>
          </div>
        </ExamComponent>
        <CodeBlock code={multiItemExampleCode} />
        <GuideDivider />
        <GuideTitle type="h3">Custom Navigator</GuideTitle>
        <ExamComponent>
          <div>
            <Carousel itemsPerView={3}>
              <Carousel.Holder>
                {Array.from({ length: 10 }, (_, index) => (
                  <Carousel.Item
                    key={`carouse-item-key-${index}`}
                    value={`item-${index}`}
                  >{`carousel-item-${index}`}</Carousel.Item>
                ))}
              </Carousel.Holder>
              <Carousel.Navigator>
                {(prev, next) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      columnGap: "10px",
                    }}
                  >
                    <Button onClick={prev} variant="negative">
                      {"<"}
                    </Button>
                    <Button onClick={next} variant="positive">
                      {">"}
                    </Button>
                  </div>
                )}
              </Carousel.Navigator>
            </Carousel>
          </div>
        </ExamComponent>
        <CodeBlock code={customNavigatorCode} />
      </Usage>
    </>
  );
};
export default CarouselGuide;
