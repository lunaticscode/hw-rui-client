import { Plugin } from "vite";

const generateStatusSchema = () => {
  return <Plugin>{
    name: "hw-rui:generate-status-schema-plugin",
    closeBundle: () => {},
  };
};
export default generateStatusSchema;
