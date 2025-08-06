import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const DEFAULT_TEMP_REDIRECT_PATH = "/components/accordion";
const useTempRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const redirectDefaultPath = () => {
    navigate(DEFAULT_TEMP_REDIRECT_PATH, { replace: true });
  };

  useEffect(() => {
    if (location.pathname === "/") {
      redirectDefaultPath();
    }
  }, [location.pathname]);
};
export default useTempRedirect;
