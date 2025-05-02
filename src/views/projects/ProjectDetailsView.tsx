import AddTaskModal from "@/components/tasks/AddTaskModal"
import EditTaskDate from "@/components/tasks/EditTaskDate"
import TaskList from "@/components/tasks/TaskList"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"
import { useAuth } from "@/hooks/useAuth"
import { getProjectById } from "@/services/ProjectService"
import { isManager } from "@/utils/policies"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"

export default function ProjectDetailsView() {

    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId! //"!" significa que siempre va a existir

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false //aca decimos que solo intente una vez (sino por defecto son 3)
    })

    const { data: user, isLoading: authLoading } = useAuth()

    /* Creamos una funcion para pasar y verificar autorizacion de edicion o eliminacion de tareas por parte de un usuario */
    const canEdit = useMemo(() => data?.manager === user?._id, [data, user])

    if (isLoading && authLoading) return "Cargando.."
    if (isError) return <Navigate to='/404' />
    if (data && user) return (
        <>
            <h1 className="text-5xl font-black ">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            {!isManager(data.manager, user._id) && (<p className="text-2xl font-light text-red-500 mt-5">No tiene acceso a crear tareas ni colaboradores</p>)}

            {isManager(data.manager, user._id) && (
                <nav className="my-5 flex gap-3">
                    <button
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        //esta url aparece al hacer click en este boton
                        onClick={() => navigate(location.pathname + '?newTask=true')}
                    >Agregar Tarea</button>

                    <Link
                        to={'team'}
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    >Colaboradores</Link>
                </nav>
            )}

            <TaskList
                tasks={data.tasks}
                canEdit={canEdit}
            />

            <AddTaskModal />
            <EditTaskDate />
            <TaskModalDetails />
        </>
    )
}
