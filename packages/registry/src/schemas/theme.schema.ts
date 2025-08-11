import z from "zod";

const themeRegistrySchema = z.object({});
export type ThemeRegistrySchema = z.infer<typeof themeRegistrySchema>;
export default themeRegistrySchema;
