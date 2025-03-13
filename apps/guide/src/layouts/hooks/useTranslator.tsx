import { FC } from "react";
import { useTranslation, Trans as OriginTrans } from "react-i18next";

interface TransProps {
  langKey: string;
}
const useTranslator = () => {
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation();

  const Trans: FC<TransProps> = ({ langKey }) => {
    return <OriginTrans>{t(langKey)}</OriginTrans>;
  };

  return {
    language,
    changeLanguage,
    Trans,
  };
};
export default useTranslator;
