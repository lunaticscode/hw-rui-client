import { HUB_REGISTRY_BASE_URL } from "@utils/api";
import GuideTitle from "@layouts/components/GuideTitle";
import { CSSProperties, useEffect, useState } from "react";
import GuideDivider from "@layouts/components/GuideDivider";

const tempColorsWrapperStyle: CSSProperties = {
  width: "100%",
  display: "flex",
};

const tempColorTokenStyle: CSSProperties = {
  width: "100px",
  height: "100px",
  marginRight: "5px",
  borderRadius: "10px",
  boxShadow: "0px 0px 2px silver",
};

const tempColorTokenKeyStyle: CSSProperties = {
  textAlign: "center",
  marginTop: "4px",
  fontSize: "12px",
};

const Color = () => {
  const [colors, setColors] = useState<Record<string, Record<string, string>>>(
    {}
  );

  const setupColorVariables = async () => {
    try {
      const req = await fetch(
        `${HUB_REGISTRY_BASE_URL}/foundations/base-color.json`
      );
      if (req.ok) {
        const colorVariables = await req.json();
        setColors(colorVariables);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setupColorVariables();
  }, []);
  return (
    <>
      <GuideTitle>Color</GuideTitle>
      <GuideTitle type={"h3"}>Base Color</GuideTitle>
      {Object.keys(colors).map((colorName, index) => (
        <div key={`color-name-key-${index}`}>
          <GuideTitle type="h4">{colorName.toUpperCase()}</GuideTitle>
          <div style={tempColorsWrapperStyle}>
            {Object.values(colors[colorName]).map((hex, index) => (
              <div>
                <div
                  key={`${colorName}-${index}-key`}
                  style={{
                    backgroundColor: hex,
                    ...tempColorTokenStyle,
                  }}
                />
                <div style={tempColorTokenKeyStyle}>
                  {`${colorName}-${Object.keys(colors[colorName])[index]}`}
                </div>
              </div>
            ))}
          </div>
          <br />
        </div>
      ))}
      <GuideDivider />
    </>
  );
};
export default Color;
