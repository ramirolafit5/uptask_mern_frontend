import { getTaskById } from "@/services/TaskService"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskDate() {

    const params = useParams()
    const projectId = params.projectId!

    /* Todo esto lo uso para el show del modal */
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('editTask')!
    /*  */

    const { data, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({ projectId, taskId }),
        //video 525 explicacion de esto
        enabled: !!taskId,
        //Que intente 1 vez (si en el editar le cambian algo de la url) y en caso de error q vaya directamente
        retry: false
    })

    if (isError) return <Navigate to={'/404'} />

    if (data) return <EditTaskModal data={data} taskId={taskId} />
}
