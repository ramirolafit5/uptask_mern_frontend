import { addUserToProject } from "@/services/TeamService"
import { TeamMember } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResultProps = {
    user: TeamMember
    reset: () => void
}

export default function SearchResult({ user, reset }: SearchResultProps) {

    const params = useParams()
    const projectId = params.projectId!

    //const navigate = useNavigate()

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset() //aca lo dejamos asi pero podria ser la de abajo si quisieramos y no tenemos que andar pasando parametros
            //navigate(`/projects/${projectId}/team`)
            //navigate(location.pathname, { replace: true }) Tal vez tmb se pueda usar esta opcion
            queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] })
        }
    })

    const handleAddUserToProject = () => {
        const data = { projectId, id: user._id }
        mutate(data)
    }

    return (
        <>
            <p className="text-center mt-10 font-bold">Resultado:</p>
            <div className="flex justify-between items-center">
                {user.name}
                <button
                    className="text-purple-500 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
                    onClick={handleAddUserToProject}
                >Agregar al proyecto</button>
            </div>
        </>
    )
}
