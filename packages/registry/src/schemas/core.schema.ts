import z from "zod";

const coreRegistrySchema = z.object({});

export type CoreRegistrySchema = z.infer<typeof coreRegistrySchema>;
export default coreRegistrySchema;
