import z from "zod";
const tmpJson = {
  schemaVersion: "1.0.0",
  components: [
    {
      name: "button",
      version: "1.2.3",
      description: "CTA-focused button",
      compat: { react: ">=18", node: ">=18" },
      npm: { dependencies: { clsx: "^2.1.1" } },
      files: [
        {
          source: "https://cdn.hw-lab.site/hw-rui/button/1.2.3/Button.tsx",
          target: "src/components/ui/Button.tsx",
          integrity: "sha256-...",
          size: 3480,
        },
      ],
    },
  ],
};

const _componentsInnerSchema = z.object({
  name: z.string(),
  version: z.string(),
  description: z.string(),
  dependencies: z.record(z.string(), z.string()),
});

const entryRegistrySchema = z.object({
  schemaVersion: z.string(),
  components: z.array(_componentsInnerSchema),
});

export default entryRegistrySchema;
