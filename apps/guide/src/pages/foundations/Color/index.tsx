import { API_BASE_URL } from "@utils/api";
import GuideTitle from "@layouts/components/GuideTitle";
import { useEffect, useState } from "react";

const getProcessedVariables = (variables: Record<string, string>) => {
  const resultVariables: Record<string, Record<string, string>> = {};
  const colorNames = Object.keys(variables)
    .map((colorToken) => colorToken.split("--color-")[1].split("-")[0])
    .filter((val, index, arr) => arr.indexOf(val) === index);

  for (let i = 0; i < colorNames.length; i++) {
    resultVariables[colorNames[i]] = {};
  }

  for (const colorToken in variables) {
    const colorName = colorToken.split("--color-")[1].split("-")[0];
    const colorValue = variables[colorToken];
    resultVariables[colorName] = {
      ...resultVariables[colorName],
      [colorToken]: colorValue,
    };
  }
  return resultVariables;
};

const Color = () => {
  const [variables, setVariables] = useState<
    Record<string, Record<string, string>>
  >({});
  const getColorVariables = async () => {
    try {
      const req = await fetch(`${API_BASE_URL}/api/foundations/color-json`);
      if (req.ok) {
        const colorVariables = await req.json();
        setVariables(getProcessedVariables(colorVariables.data));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getColorVariables();
  }, []);
  return (
    <>
      <GuideTitle>Color</GuideTitle>
      {Object.keys(variables).map((colorName, index) => (
        <div key={`color-name-key-${index}`}>
          <GuideTitle type="h3">{colorName}</GuideTitle>
          <div>
            {Object.values(variables[colorName]).map(
              (hex: string, index: number) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "10px",
                  }}
                >
                  <div
                    key={`${index}`}
                    style={{
                      backgroundColor: hex,
                      width: "100px",
                      marginBottom: "5px",
                      height: "50px",
                    }}
                  />
                  <div>{Object.keys(variables[colorName])[index]}</div>
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </>
  );
};
export default Color;
