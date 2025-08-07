const DEVELOPMENT_URL = "http://localhost:5173";
const PRODUCTION_URL = "https://rui.hw-lab.site";

const BASE_URL =
  process.env.NODE_ENV === "production" ? PRODUCTION_URL : DEVELOPMENT_URL;

export const componentsStatusUrl = `${BASE_URL}/status.json`;
