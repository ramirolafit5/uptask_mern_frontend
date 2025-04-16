import AddTaskModal from "@/components/tasks/AddTaskModal"
import EditTaskDate from "@/components/tasks/EditTaskDate"
import TaskList from "@/components/tasks/TaskList"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"
import { getProjectById } from "@/services/ProjectService"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useNavigate, useParams } from "react-router-dom"

export default function ProjectDetailsView() {

    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId! //"!" significa que siempre va a existir

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false //aca decimos que solo intente una vez (sino por defecto son 3)
    })

    if (isLoading) return "Cargando.."
    if (isError) return <Navigate to='/404' />
    if (data) return (
        <>
            <h1 className="text-5xl font-black ">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            <nav className="my-5 flex gap-3">
                <button
                    type="button"
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    //esta url aparece al hacer click en este boton
                    onClick={() => navigate(location.pathname + '?newTask=true')}
                >Agregar Tarea</button>
            </nav>

            <TaskList
                tasks={data.tasks}
            />

            <AddTaskModal />
            <EditTaskDate />
            <TaskModalDetails />
        </>
    )
}
