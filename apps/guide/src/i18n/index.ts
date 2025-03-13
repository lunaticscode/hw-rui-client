import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import koKR from "./resources/ko-KR.json";
import enUS from "./resources/en-US.json";

const resources: Resource = {
  "ko-KR": {
    translation: koKR,
  },
  "en-US": {
    translation: enUS,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ko-KR",
});

export default i18n;
