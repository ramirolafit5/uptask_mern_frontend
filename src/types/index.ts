import { z } from "zod";

/** Tasks */

export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])
export type TaskStatus = z.infer<typeof taskStatusSchema>


export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string()
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick <Task, 'name' | 'description'>

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

//getProject
//lo que hacemos aca es generar el array con los datos de projectSchema y con los atributos que le asignamos con pick
export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true
    })
)