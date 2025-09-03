export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://hw-lab.site"
    : "http://localhost:8080";

const HUB_API_BASE_URL = import.meta.env.PROD
  ? "https://rui-hub.hw-lab.site"
  : "http://localhost:8085";

export const HUB_REGISTRY_BASE_URL = import.meta.env.PROD
  ? `${HUB_API_BASE_URL}/registry`
  : HUB_API_BASE_URL;
