import z from "zod";

const uiRegistrySchema = z.object({});
export type UiRegistrySchema = z.infer<typeof uiRegistrySchema>;
export default uiRegistrySchema;
