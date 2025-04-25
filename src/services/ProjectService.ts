import api from "@/lib/axios";
import { dashboardProjectSchema, Project, ProjectFormData } from "@/types";
import { isAxiosError } from "axios";

export async function createProject(formData : ProjectFormData){
    try {
        const {data} = await api.post('/projects', formData)
        return data
    } catch (error) {
        //aca fue copy paste para el toast en caso de error de creacion
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjects(){
    try {
        //manejamos la autorizacion desde axios y aca la usamos cuando llamamos a "api"
        const {data} = await api.get('/projects')

        const response = dashboardProjectSchema.safeParse(data)
        /* aca en vez de devolver solo data como en createProject, verificamos que el response sea success
        y lo devolvemos como viene desde el schema que creamos */
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

export async function getProjectById(id: Project['_id']){
    try {
        const {data} = await api.get(`/projects/${id}`)
        return data
        
    } catch (error) {
        //aca fue copy paste para el toast en caso de error de creacion
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

type projectServiceType = {
    formData: ProjectFormData
    projectId: Project['_id']
}

export async function updateProject({formData, projectId} : projectServiceType){
    try {
        const {data} = await api.put(`/projects/${projectId}`, formData)
        return data
        
    } catch (error) {
        //aca fue copy paste para el toast en caso de error de creacion
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteProject(id: Project['_id']){
    try {
        //<string> es para decir bueno data ahora es de tipo string prq en el controller hacemos un send string
        const {data} = await api.delete<string>(`/projects/${id}`)
        return data
        
    } catch (error) {
        //aca fue copy paste para el toast en caso de error de creacion
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}