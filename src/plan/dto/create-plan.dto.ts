import {TypeOf, z} from "zod";

export const createPlanDto = z.object({

    title:z.string().nonempty(),
    description: z.string().optional(),
    deadline: z.date(),
});


export type createPlanDto= z.infer <typeof createPlanDto>;
