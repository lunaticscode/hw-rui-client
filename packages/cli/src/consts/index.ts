const DEVELOPMENT_URL = "http://localhost:5173";
const PRODUCTION_URL = "https://rui.hw-lab.site";

const DEVELOPMENT_HUB_URL = "http://localhost:8085";
const PRODUCTION_HUB_URL = "https://rui-hub.hw-lab.site";

const BASE_URL =
  process.env.NODE_ENV === "production" ? PRODUCTION_URL : DEVELOPMENT_URL;

export const HUB_BASE_URL =
  process.env.NODE_ENV === "production"
    ? PRODUCTION_HUB_URL
    : DEVELOPMENT_HUB_URL;

export const HUB_BASE_REGISTRY_URL =
  process.env.NODE_ENV === "production"
    ? `${HUB_BASE_URL}/registry`
    : HUB_BASE_URL;

const MANIFEST_FILENAME = "hw-rui-manifest.json";

export const componentsStatusUrl = `${BASE_URL}/status.json`;
