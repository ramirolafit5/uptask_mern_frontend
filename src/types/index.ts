import { z } from "zod";

/** Auth and Users */

const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    current_password: z.string(), //Este lo agregamos para la parte de updateCurrentUserPassword
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, 'email' | 'password'>

export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>

export type RequestConfirmationCodeForm = Pick<Auth, 'email'>

export type ConfirmToken = Pick<Auth, 'token'>

export type ForgotPasswordForm = Pick<Auth, 'email'>

export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>

export type UpdateCurrentUserPasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>

export type CheckPasswordForm = Pick<Auth, 'password'>

/** Users */

//podria hacerse como cualquier esquema pero esta es otra alternativa
export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    _id: z.string()
})
export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, 'name' | 'email'>

/** Notes */
export const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task: z.string().optional(),
    //Dsp de agregar las notas (para saber cuando se creó)
    createdAt: z.string()
})
export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>


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
    updatedAt: z.string(),
    completedBy: z.array(z.object({
        _id: z.string(),
        user: userSchema,
        status: taskStatusSchema
    })),
    //Modificacion dsp de crear las notas
    notes: z.array(noteSchema.extend({
        createdBy: userSchema
    }))
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick <Task, 'name' | 'description'>

/** Projects */
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(userSchema.pick({_id: true}))
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
        description: true,
        manager: true
    })
)

/** Teams */
export const TeamMemberSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true
})
export const TeamMembersSchema = z.array(TeamMemberSchema)
export type TeamMember = z.infer<typeof TeamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>