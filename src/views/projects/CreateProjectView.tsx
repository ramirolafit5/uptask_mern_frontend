import ProjectForm from "@/components/projects/ProjectForm";
import { createProject } from "@/services/ProjectService";
import { ProjectFormData } from "@/types";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateProjectView() {

    const navigate = useNavigate()

    const initialValues : ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""    
    }
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

    const handleForm = async (formData : ProjectFormData) => {
        const data = await createProject(formData)
        //es el cartel que sale cuando creamos un proyecto
        toast.success(data)
        navigate('/')
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Crear Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto</p>

                <div className="my-5">
                    <Link
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        to="/"             
                    >
                        Volver a Proyectos
                    </Link>
                </div>

                <form 
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    /* deshabilitamos la validacion de HTML5 para poder manejarla nosotros */
                    noValidate
                >

                    <ProjectForm
                        register={register}
                        errors={errors}
                    />

                    <input 
                        type="submit"
                        value="Crear Proyecto"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}
