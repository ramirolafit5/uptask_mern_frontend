import api from "@/lib/axios"
import { Note, NoteFormData, Project, Task } from "@/types"
import { isAxiosError } from "axios"

type NoteService = {
    formData: NoteFormData
    projectId: Project['_id']
    taskId: Task['_id']
    noteId: Note['_id']
}

export async function createNote ({formData, projectId, taskId}: Pick<NoteService, 'formData' | 'projectId' | 'taskId'>){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteNote({projectId, taskId, noteId}: Pick<NoteService, 'projectId' | 'taskId' | 'noteId'>){
    try {
        const {data} = await api.delete<string>(`/projects/${projectId}/tasks/${taskId}/notes/${noteId}`)
        return data
        
    } catch (error) {
        //aca fue copy paste para el toast en caso de error de creacion
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}