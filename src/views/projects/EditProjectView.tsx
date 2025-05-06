import EditProjectForm from "@/components/projects/EditProjectForm"
import CircularIndeterminate from "@/components/spinner"
import { getProjectById } from "@/services/ProjectService"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"

export default function EditProjectView() {

    const params = useParams()
    const projectId = params.projectId! //"!" significa que siempre va a existir

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false //aca decimos que solo intente una vez (sino por defecto son 3)
    })

    if (isLoading) return <CircularIndeterminate />
    if (isError) return <Navigate to='/404' />
    if (data) return <EditProjectForm data={data} projectId={projectId} />
}
