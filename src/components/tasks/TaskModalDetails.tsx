import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '@/services/TaskService';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/utils';
import { statusTranslation } from '@/locales/es';
import { TaskStatus } from '@/types';
import NotesPanel from '../notes/NotesPanel';


export default function TaskModalDetails() {

    const params = useParams()
    const projectId = params.projectId!

    /* Todo esto lo uso para el show del modal */
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!

    const show = taskId ? true : false
    /* -------------------------------------- */

    const { data, isError, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({ projectId, taskId }),
        //video 525 explicacion de esto
        //significa que "solamente si taskId existe queremos hacer esta consulta" entonces esos dos
        //signos lo convierten en true o false

        enabled: !!taskId,
        //Que intente 1 vez (si en el editar le cambian algo de la url) y en caso de error q vaya directamente
        retry: false
    })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        /* ese data viene del return del controller */
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
            queryClient.invalidateQueries({ queryKey: ['editProject', projectId] })
            toast.success(data)
            navigate(location.pathname, { replace: true })
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus
        const data = { projectId, taskId, status }
        mutate(data)
    }

    if (isError) {
        //lo q esta entre corchetes es para darle identificador al error entonces q no se repita
        toast.error(error.message || 'Ocurrio un error', { toastId: 'error' })
        return <Navigate to={`/projects/${projectId}`} />
    }

    //decimos bueno si existe algo mostrá esto.
    if (data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada el: {formatDate(data.createdAt)}</p>
                                    <p className='text-sm text-slate-400'>Última actualización: {formatDate(data.updatedAt)}</p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}</Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-2'>Descripcion: {data.description}</p>

                                    {data.completedBy.length ? (
                                        <>
                                            <p className='font-bold text-2xl text-slate-600 my-5'>Historial de cambios</p>
                                            <ul className='list-decimal'>
                                                {data.completedBy.map((activityLog) => (

                                                    <li key={activityLog._id}>
                                                        <span className='font-bold text-slate-600'>
                                                            {statusTranslation[activityLog.status]}
                                                        </span>{' por '}
                                                        {activityLog.user.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : null}

                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado actual:</label>
                                        <select
                                            className='w-full p-3 bg-white border border-gray-300'
                                            defaultValue={data.status}
                                            onChange={handleChange}
                                        >
                                            {Object.entries(statusTranslation).map(([key, value]) => (
                                                <option key={key} value={key}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <NotesPanel
                                        notes={data.notes}
                                    />

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}