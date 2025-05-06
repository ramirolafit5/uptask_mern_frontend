import { Link, Outlet, useNavigate } from "react-router-dom"
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"
import { ToastContainer } from 'react-toastify'
import { useAuth } from "@/hooks/useAuth"
import CircularIndeterminate from "@/components/spinner"

export default function AppLayout() {

    const { data, isError, isLoading } = useAuth()

    const navigate = useNavigate()

    /* ACLARACION: lo siguiente significa.. mientras carga devolve "Cargando", si hay algun error navega
    al login y si hay data devolve el return con la informacion */

    if (isLoading) return <CircularIndeterminate />
    if (isError) {
        navigate('/auth/login')
        return
    }

    if (data) return (
        <>
            <header className="bg-gray-800 py-5">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-64">
                        <Link to={'/'}>
                            <Logo />
                        </Link>
                    </div>
                    <NavMenu
                        name={data.name}
                    />

                </div>
            </header>

            <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                <Outlet />
            </section>

            <footer className="py-5">
                <p className="text-center">
                    Todos los derechos reservados {new Date().getFullYear()}
                </p>
            </footer>

            <ToastContainer
                /* esto es para que cuando tengamos el mouse arriba de la notificacion no se frene */
                pauseOnFocusLoss={false}
                pauseOnHover={false}
            />

        </>
    )
}
