import {z} from "zod";

export const PipelineStepZod = z.object({
    id: z.number(),
    step_nb: z.number(),
    validated: z.boolean(),
    description: z.string(),
});

export type PipelineStep = z.infer<typeof PipelineStepZod>;
