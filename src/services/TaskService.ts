import api from "@/lib/axios";
import { Project, Task, TaskFormData, taskSchema } from "@/types";
import { isAxiosError } from "axios";

type TaskService = {
    formData: TaskFormData
    projectId: Project['_id']
    taskId: Task['_id']
    status: Task['status']
}

export async function createTask({formData, projectId}: Pick<TaskService, 'formData' | 'projectId'>){
    try {
        const url = `/projects/${projectId}/tasks`
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        //aca fue copy paste para el toast en caso de error de creacion
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTaskById({projectId, taskId} : Pick<TaskService, 'projectId' | 'taskId'>){
    try {
        const {data} = await api.get(`/projects/${projectId}/tasks/${taskId}`)
        const response = taskSchema.safeParse(data)
        if(response.success){
            return response.data
        }
        
    } catch (error) {
        //aca fue copy paste para el toast en caso de error de creacion
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateTask({projectId, taskId, formData} : Pick<TaskService, 'projectId' | 'taskId' | 'formData'>){
    try {
        const {data} = await api.put(`/projects/${projectId}/tasks/${taskId}`, formData)
        return data
        
    } catch (error) {
        //aca fue copy paste para el toast en caso de error de creacion
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTask({projectId, taskId}: Pick<TaskService, 'projectId' | 'taskId'>){
    try {
        //<string> es para decir bueno data ahora es de tipo string prq en el controller hacemos un send string
        const {data} = await api.delete<string>(`/projects/${projectId}/tasks/${taskId}`)
        return data
        
    } catch (error) {
        //aca fue copy paste para el toast en caso de error de creacion
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateStatus({projectId, taskId, status}: Pick<TaskService, 'projectId' | 'taskId' | 'status'>){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/status`
        const {data} = await api.post<string>(url, {status})
        return data
        
    } catch (error) {
        //aca fue copy paste para el toast en caso de error de creacion
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
