import { z } from "zod";

/** Projects */
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string()
})

export type Project = z.infer<typeof projectSchema>

/* Aca le decimos que queremos tomar todo del type de Project menos algun atributo en particular */
export type ProjectFormData = Pick <Project, 'clientName' | 'projectName' | 'description'>