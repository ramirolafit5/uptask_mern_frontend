import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types"
import { formatDate } from "@/utils/utils"
import CircularIndeterminate from "../spinner"
import { useMemo } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { deleteNote } from "@/services/NoteService"
import { useLocation, useParams } from "react-router-dom"

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({ note }: NoteDetailProps) {

    /* Para que los botones de eliminar aparezcan solo en el usuario que las creo asi solo el puede eliminarlas
    hay q llamar al useAuth para ver quien se encuentra logeado y poder comparar  */

    const { data, isLoading } = useAuth()

    if (isLoading) return <CircularIndeterminate />
    const canDelete = useMemo(() => { return data?._id === note.createdBy._id }, [data])

    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
        }
    })

    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} por: <span className="font-bold">{note.createdBy.name}</span>
                </p>
                <p className="text-xs text-slate-500">
                    {formatDate(note.createdAt)}
                </p>
            </div>
            {canDelete && (
                <button
                    type="button"
                    className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
                    onClick={() => mutate({ projectId, taskId, noteId: note._id })}
                >Eliminar</button>
            )}
        </div>
    )
}
